// router
const { Router, response } = require('express')
const session = require('express-session')

//authSession
const authSession = require('../authSession')

//Routers
const routerLogin = Router()

//model
const Usuarios = require('../../models/user')




routerLogin.get('/', async(req, res) => {
    res.render('login')
})



routerLogin.get('/logout', authSession, async(req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log("error session destroy")
            throw new Error()
        } else {
            return res.render('register-error', { error: "Logout Ok" })
        }
    })

})

routerLogin.post('/', async(req, res) => {
    //res.render('login')
    const { password, email } = req.body;
    try {
        const userMail = await Usuarios.find()
            .findOne({ email: email })
        const userPass = await Usuarios.find()
            .findOne({ password: password })


        if (userMail && userPass) {
            //res.json("welcome")
            req.session.user = userMail

            res.redirect('/api/home')
        } else {
            return res.render('register-error', { error: "User or Password incorrect" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Connection Error"
        })
        throw new Error()
    }
})


module.exports = routerLogin