// router
const { Router, response } = require('express')
const session = require('express-session')

//passport
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')


//router
const routerRegister = Router()

//models
const Usuarios = require('../../models/user')

routerRegister.get('/', (req, res) => {

    res.render('register')
})

routerRegister.post('/', passport.authenticate('register', {

    failureRedirect: 'register-error',
    successRedirect: 'home',

}))

routerRegister.get('/register-error', (req, res) => {

    res.render('register-error', { error: "user or password incorrected" })

})



/*routerRegister.post('/', async(req, res) => {
    console.log(req.body)
    const { password, password2, email, name } = req.body;
    if (password2 !== password) {
        return res.render('register-error', { error: "Password must be equal" })
    }
    //const newPassword = bcrypt.hashSync(password, 10)
    try {
        const userExist = await Usuarios.find().findOne({ email: email })
        if (userExist) {
            return res.render('register-error', { error: "User has already been registered" })
        }
        const user = new Usuarios(req.body)
        await user.save()
        return res.redirect('/api/home')

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro del servidor" })
    }

})*/





module.exports = routerRegister