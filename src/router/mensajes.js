// router
const { Router, response } = require('express')
const routerMessage = Router()

//DB
const { knexMariaDB, knexSqlite3 } = require('../../DB/options')

//saveMessages
const { Messages } = require('../../saveMessages')

//socket IO
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')


const httpServer = new HttpServer(routerMessage)
const io = new IOServer(httpServer)

//saveMessages
const data = new Messages(knexSqlite3)


data.crearTabla()
    .then(() => {
        console.log("2) tabla creada")
    })


routerMessage.get('/', async(req, res) => {

    try {
        const message = await data.getMessages()
        res.render('messages', message)
    } catch (error) {
        res.send(error)
        throw error
    }
})

routerMessage.post('/', async(req, res) => {

    socket.on('mensaje', data => {
        io.sockets.emit('mensajes', data)
    })
    try {
        const message = await data.saveMessages(message)
        res.render('messages', message)
    } catch (error) {
        res.send(error)
        throw error
    }
})





module.exports = routerMessage