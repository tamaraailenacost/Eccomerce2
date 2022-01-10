//Realizar un proyecto de servidor que ofrezca un api restful de productos.
//GET productos
//GET producto por ID
//POST recibe y agrega un producto nuevo y returna si ID
//PUT actualiza producto segun ID
//DELETE elimina un producto segun si ID
//Para el caso de que un producto no exista se devolvera el objeto  { error: "producto no encontrado"}

//Router Express
const { Router, response } = require('express')
const router = Router()

//lectura de archivos
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

//authSession
const authSession = require('../authSession')

//Contenedor
const { Contenedor } = require('../../Contenedor')


//DB
const { knexMariaDB, knexSqlite3 } = require('../../DB/options')


const data = new Contenedor(knexMariaDB)

data.crearTabla()
    .then(() => {
        console.log("1) tabla creada")
    })





router.get('/', authSession, async(req, res) => {
    try {
        let todo = await data.getAll()
        console.log(todo)
        if (todo) {
            res.json(todo)
        }
        res.json('no hay productos para mostrar')

    } catch (error) {
        res.send(error)
    }
})


router.get('/:id', authSession, async(req, res) => {
    try {
        const id = req.params.id
        const product = await data.getById(id)
        res.json(product)
    } catch (error) {
        res.send(error)
    }

})


router.post('/', authSession, upload.single('miArchivo'), async(req, res) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    if (!req.file) {
        error.httpStatusCode = 400
        throw new Error
    }
    let url = req.file.originalname
    let { title, price, stock } = req.body
    let newProduct = {
        "title": title,
        "image": url,
        "price": price,
        "stock": stock,
    }
    console.log(newProduct)
    try {
        await data.save(newProduct)
        res.json("producto agregado")

    } catch (err) {
        throw err
    }
})



router.put("/:id", authSession, async(req, res) => {
    const { stock } = req.body;
    const id = Number(req.params.id);
    const updating = await data.update(id, stock);
    if (updating === null) return res.send({ error: "cannot find product" });
    res.send({
        message: "product updated"
    });
});


// delete y update no estan funcionando bien revisar
//crear un error handler
// revisar que la funcion delete bt id tiene que retoranr objeto no encontrado si no esta el id
router.delete('/:id', authSession, async(req, res) => {
    try {
        const id = req.params.id
        await data.deleteById(id)
        res.send(`el producto ${id} fue eliminanod con éxito!`)
    } catch (error) {
        res.send(error, "producto no encontrado")
    }
})


module.exports = router