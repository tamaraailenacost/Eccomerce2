const { Router, response } = require('express')
const routerMessage = Router()

routerMessage.get('/', async(req, res) => {
    try {
        res.render('messages', )
    } catch (error) {
        res.send(error)
    }
})





module.exports = routerMessage