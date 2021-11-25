// router
const { Router, response } = require('express')
const routerMessage = Router()

//DB
const { knexMariaDB, knexSqlite3 } = require('../../DB/options')

//saveMessages
const { Messages } = require('../../saveMessages')
const data = new Messages(knexSqlite3)

//socket IO
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')


const httpServer = new HttpServer(routerMessage)
const io = new IOServer(httpServer)

data.crearTabla()
    .then(() => {
        console.log("1) tabla creada")
    })


routerMessage.get('/', async(req, res) => {

    io.on('connection', socket => {
        console.log('Nuevo cliente!')
    })
    try {
        const message = await data.getMessages()
        res.render('messages', message)
    } catch (error) {
        res.send(error)
        throw error
    }
})

routerMessage.post('/', async(req, res) => {

    const message = req.body
    try {
        const message = await data.saveMessages(message)
        res.render('messages', message)
    } catch (error) {
        res.send(error)
        throw error
    }
})





module.exports = routerMessage