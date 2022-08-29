// router
const { Router, response } = require('express')
const routerMessage = Router()

//log4js
const { log4js } = require('../../node_modules/log4js-module');
const log = log4js.getLogger();

//DB
const { knexMariaDB, knexSqlite3 } = require('../../DB/options')

//saveMessages
//const { Messages } = require('../../saveMessages')
const Mensaje = require('../../models/saveMessages')



//saveMessages
//const data = new Messages(knexMariaDB)


/*data.crearTabla()
    .then(() => {
        console.log("2) tabla creada")
    })*/


// Obtiene todos los mensajes
const getMessages = async() => {
    try {
        //const msj = await data.getMessages()
        const msj = await Mensaje.find()
        return msj
    } catch (error) {
        log.error("Este es un error");
        console.log("mensajes vacios")
        throw error
    }
}


// Guarda los mensajes
const saveMessages = async(message) => {
    try {

        console.log(message)
            //const saveMessage = await data.saveMessages(message);
        const saveMessage = new Mensaje(message)
        await saveMessage.save()
    } catch (error) {
        log.error("Este es un error");
        throw error
    }
}

routerMessage.get('/', (req, res) => {

    try {

        res.render('messages')
    } catch (error) {
        log.error("Este es un error");
        res.send(error)
        throw error
    }
})

// Exportando
module.exports = {
    getMessages,
    saveMessages,
    routerMessage
}