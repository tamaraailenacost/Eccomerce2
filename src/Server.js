const express = require('express');

//router
const router = require('./router/productos.js');
const routerMessage = require('./router/mensajes.js');


//Socket IO
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io');



class Server {


    constructor() {

        ////Socket Io
        this.app = express()
        this.httpServer = new HttpServer(this.app)
        this.io = new IOServer(this.httpServer)
        this.port = 8080

        // function
        this.starting()
        this.middleware()
        this.routing()

    }



    starting = () => {

        this.io.on('connection', socket => {
            console.log('Nuevo cliente conectado!')

            /* Envio los mensajes al cliente que se conectó */
            //socket.emit('mensajes', mensajes)

            /* Escucho los mensajes enviado por el cliente y se los propago a todos 
            socket.on('mensaje', data => {
                mensajes.push({ socketid: socket.id, mensaje: data })
                io.sockets.emit('mensajes', mensajes)
            })*/
        })

        //Socket IO
        // Arrancamos el servidor con http.listen() y NO con app.listen()

        const server = this.httpServer.listen(this.port, () =>
            console.log(`Servidor escuchando en el puerto`))
        server.on("error", (error) =>
            console.log(`Error en servidor ${error}`))

    }

    middleware = () => {


        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.static('public'))
        this.app.use(function(err, req, resp, next) {
            console.log(err.stack)
            resp.status(500).send('Error Server')
        })

    }


    routing = () => {

        this.app.use('/api/productos', router)
        this.app.use('/api/mensajes', routerMessage)

    }


}
module.exports = { Server }