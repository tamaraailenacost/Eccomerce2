//Realizar un proyecto de servidor que ofrezca un api restful de productos.
//GET productos
//GET producto por ID
//POST recibe y agrega un producto nuevo y returna si ID
//PUT actualiza producto segun ID
//DELETE elimina un producto segun si ID
//Para el caso de que un producto no exista se devolvera el objeto  { error: "producto no encontrado"}


const { Server } = require('./src/Server')
const express = require('express')


const server = new Server()
server.starting();


server.app.get('/api/productos', (req, res) => {
    const { num1, num2 } = req.params
    res.send('ok get')
})

server.app.get('/api/productos/:id', (req, res) => {
    const { num1, num2 } = req.query
    res.send('ok get')
})


server.app.post('/api/productos', (req, res) => {
    res.send('ok post')
})

server.app.put('/api/productos/:id', (req, res) => {
    res.send('ok put')
})

server.app.delete('/api/productos/:id', (req, res) => {
    res.send('ok delete')
})