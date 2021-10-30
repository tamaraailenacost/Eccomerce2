//Realizar un proyecto de servidor que ofrezca un api restful de productos.
//GET productos
//GET producto por ID
//POST recibe y agrega un producto nuevo y returna si ID
//PUT actualiza producto segun ID
//DELETE elimina un producto segun si ID
//Para el caso de que un producto no exista se devolvera el objeto  { error: "producto no encontrado"}

const { Router, response } = require('express')
const multer = require('multer')
const router = Router()
const { Contenedor } = require('../../Contenedor')
const upload = multer({ dest: 'uploads/' })


const data = new Contenedor('../../productos.txt')



router.get('/', async(req, res) => {
    try {
        let todo = await data.getAll()
        res.send(todo)
    } catch (error) {
        res.send(error)
    }
})


router.get('/:id', async(req, res) => {
    try {
        const id = req.params.id
        const product = await data.getById(id)
        res.json(product)
    } catch (error) {
        res.send(error)
    }

})


router.post('/', upload.single('miArchivo'), async(req, res) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    let file = req.file
    let { title, price } = req.body
    let newProduct = {
        "title": title,
        "price": price,
        "image": req.file
    }
    if (!file) {
        let error = new Error('Error subiendo archivo')
        error.httpStatusCode = 400
        throw new Error
    }
    try {
        let id = await data.save(newProduct)
        res.send(`Archivo <b>${file.originalname}</b> subido exitosamente id: ${id}`)


    } catch (err) {
        throw new Error
    }
})



router.put("/:id", async(req, res) => {
    const updateProduct = req.body;
    const id = Number(req.params.id);
    updateProduct.id = id;
    const updating = await data.update(id, updateProduct);
    if (updating === null) return res.send({ error: "cannot find product" });
    res.send({
        message: "product updated"
    });
});


// delete y update no estan funcionando bien revisar
//crear un error handler
// revisar que la funcion delete bt id tiene que retoranr objeto no encontrado si no esta el id
router.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id
        const product = await data.deleteById(id)
        res.json(`el producto ${id} fue eliminanod con éxito!`)
    } catch (error) {
        res.json(error, "producto no encontrado")
    }
})


module.exports = router