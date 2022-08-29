const express = require('express');

//passport
const passport = require('passport')
const passportConfig = require('./passport')
passportConfig(passport)


//session
const session = require('express-session')

//router
const router = require('./router/productos.js');
const { getMessages, saveMessages, routerMessage } = require('./router/mensajes')
const routerTest = require('./router/productos-test')
const routerLogin = require('./router/login')
const routerRegister = require('./router/register')
const routerInfo = require('./router/info.js')
const routerRandom = require('./router/random')


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
        this.port = process.env.PORT

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

        this.app.use(session({
            secret: process.env.SESSIONSECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                maxAge: 600000
            }
        }))
        this.app.use(passport.initialize())
        this.app.use(passport.session())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.static('public'))
        this.app.use(function(err, req, resp, next) {
            console.log(err.stack)
            resp.status(500).send('Error Server')
        })

    }


    routing = () => {

        //this.app.use('/api/productos', router)
        this.app.use('/api/mensajes', routerMessage)
        this.app.use('/api/productos-test', routerTest)
        this.app.use('/api/login', routerLogin)
        this.app.use('/api/register', routerRegister)
        this.app.use('/api/info', routerInfo)
        this.app.use('/api/randoms', routerRandom)

    }


}
module.exports = { Server }