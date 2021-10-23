//Realizar un proyecto de servidor que ofrezca un api restful de productos.
//GET productos
//GET producto por ID
//POST recibe y agrega un producto nuevo y returna si ID
//PUT actualiza producto segun ID
//DELETE elimina un producto segun si ID
//Para el caso de que un producto no exista se devolvera el objeto  { error: "producto no encontrado"}

const { Router } = require('express')
const router = Router()
const { Contenedor } = require('../../Contenedor')


const data = new Contenedor('../../productos.txt')



router.get('/', async(req, res) => {
    try {
        let todo = await data.getAll()
        res.send(todo)
    } catch (error) {
        res.send(error)
    }
})


router.get('/:id', (req, resp) => {
    const todo = data.getById(1)
    todo.then((result) => resp.send(result))
})



router.post('', (req, res) => {
    const { title, price } = req.body
    res.send('ok post', body)
})


router.put('/:id', (req, res) => {
    res.send('ok put')
})

router.delete('/:id', (req, res) => {
    let todo = data.deleteById(1)
    todo.then((result) => res.send(result))
})


module.exports = router