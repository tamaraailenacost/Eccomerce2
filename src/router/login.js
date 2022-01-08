// router
const { Router, response } = require('express')
const session = require('express-session')

//Routers
const routerLogin = Router()

//model
const Usuarios = require('../../models/user')




routerLogin.get('/', async(req, res) => {
    res.render('login')
})



routerLogin.get('/logout', async(req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.json({ status: 'Logout ERROR', body: err })
        } else {
            res.send('Logout ok!')
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
            res.render('home')
        } else {
            return res.status(400).json({
                message: "User or password incorrect"
            })
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