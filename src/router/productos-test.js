//Router Express
const { Router, response } = require('express')
const routerTest = Router()


//faker
const faker = require('faker')
faker.locale = 'en'


//Elegir apropiadamente los temas para conformar el objeto ‘producto’ (nombre, precio y foto.
const productoTest = () => {
    return {
        nombre: faker.commerce.productName(),
        precio: faker.commerce.price(),
        foto: faker.image.avatar()
    }
}

const cantidad = (Num) => {

    const productos = []
    for (let i = 0; i < Num; i++) {
        productos.push(productoTest())
    }
    return productos;
}


//api/test-productos
routerTest.get('/:cant', (req, res) => {

    console.log(req.params.cant)

    try {
        const cant = Number(req.params.cant)
        res.json(cantidad(cant))

    } catch (error) {
        res.send(error)
        throw new Error
    }
})




module.exports = routerTest