// router
const { Router, response } = require('express')
const routerRegister = Router()


routerRegister.get('/', (req, res) => {

    res.render('register')
})


module.exports = routerRegister