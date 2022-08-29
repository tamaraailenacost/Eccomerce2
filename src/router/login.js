// router
const { Router, response } = require('express')
const session = require('express-session')

//authSession
const authSession = require('../authSession')

//Routers
const routerLogin = Router()

//model
const Usuarios = require('../../models/user')

//passport
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')

//log4js
const { log4js } = require('../../node_modules/log4js-module');
const log = log4js.getLogger();




routerLogin.get('/', (req, res) => {
    res.render('login')
})



routerLogin.get('/logout', authSession, async(req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log("error session destroy")
            res.render('register-error', { error: "Error al logout" })
        } else {
            log.error("Este es un error");
            res.render('register-error', { error: "Logout Ok" })
        }
    })

})

//Login within Passport 
routerLogin.post('/', passport.authenticate('login', {

    failureRedirect: '/api/login/register-error',
    successRedirect: 'home',

}))


routerLogin.get('/register-error', (req, res) => {

    log.error("Este es un error");
    res.render('register-error')

})


// Login without passport 
/*routerLogin.post('/', async(req, res) => {

    const { password, email } = req.body;
     try {

         //email
         const userMail = await Usuarios.find()
             .findOne({ email: email })
         if (!userMail) {
             return res.render('register-error', { error: "Password incorrect" })
         }

         //pasword
         const userPass = await Usuarios.find()
             .findOne({ password: password })
         if (!userPass) {
             return res.render('register-error', { error: "Password incorrect" })
         }

         req.session.user = userMail
         res.redirect('/api/home')


     } catch (error) {
         console.log(error)
         res.status(500).json({
             message: "Connection Error"
         })
     }
})*/


module.exports = routerLogin