// router
const { Router, response } = require('express')
const routerLogin = Router()


routerLogin.get('/', (req, res) => {

    res.render('login')
})


module.exports = routerLogin