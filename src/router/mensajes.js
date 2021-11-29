// router
const { Router, response } = require('express')
const routerMessage = Router()

//DB
const { knexMariaDB, knexSqlite3 } = require('../../DB/options')

//saveMessages
const { Messages } = require('../../saveMessages')


//saveMessages
const data = new Messages(knexMariaDB)


data.crearTabla()
    .then(() => {
        console.log("2) tabla creada")
    })


// Obtiene todos los mensajes
const getMessages = async() => {
        try {
            const msj = await data.getMessages()
            return msj
        } catch (error) {
            console.log("mensajes vacios")
            throw error
        }
    }
    // Guarda los mensajes
const saveMessages = async(message) => {
    try {
        const saveMessage = await data.saveMessages(message);
        return saveMessage
    } catch (error) {
        throw error
    }
}

routerMessage.get('/', (req, res) => {

    try {

        res.render('messages')
    } catch (error) {
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