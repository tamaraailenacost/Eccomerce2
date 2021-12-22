const express = require('express');

//router
const router = require('./router/productos.js');
const { getMessages, saveMessages, routerMessage } = require('./router/mensajes')
const routerTest = require('./router/productos-test')


//Socket IO
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io');

//MongoDB
const { MongoConnection } = require('../DB/MongoDb')

//Normalzer
const { normalize, schema } = require("normalizr");




class Server {


    constructor() {

        ////Socket Io
        this.app = express()
        this.httpServer = new HttpServer(this.app)
        this.io = new IOServer(this.httpServer)
        this.port = 8080

        // function
        this.starting()
        this.socket()
        this.dbconecction()
        this.middleware()
        this.routing()


    }

    socket = () => {

        this.io.on('connection', socket => {
            console.log('Nuevo cliente conectado!')


            //Escucho los mensajes enviado por el cliente y se los propago a todos
            socket.on('sendMensaje', async(data) => {
                const save = await saveMessages(data);

                //traigo los mensajes los mensajes
                const mensajes = await getMessages();
                //console.log(mensajes)

                //Normalzr

                // Define your schema
                const author = new schema.Entity('author', {}, { idAttribute: 'email' });


                // Define your message
                const mensajeEntity = new schema.Entity('mensajes', {
                    author: [author]
                });

                const normalizedData = normalize(mensajes, mensajeEntity)
                console.log(normalizedData)
                console.log(JSON.stringify(normalizedData).length)

                //enviamos nuevamente los mensajes
                this.io.emit("sendMensaje", mensajes);
            })
        })

    }


    starting = () => {

        //Socket IO
        // Arrancamos el servidor con http.listen() y NO con app.listen()
        const server = this.httpServer.listen(this.port, () =>
            console.log(`Servidor escuchando en el puerto`))
        server.on("error", (error) =>
            console.log(`Error en servidor ${error}`))

    }

    dbconecction = async() => {
        await MongoConnection()
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
        this.app.use('/api/productos-test', routerTest)

    }


}
module.exports = { Server }