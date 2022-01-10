// router
const { Router, response } = require('express')
const session = require('express-session')

//router
const routerRegister = Router()

//models
const Usuarios = require('../../models/user')




routerRegister.post('/', async(req, res) => {
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
        throw new Error
    }

})





routerRegister.get('/', (req, res) => {

    res.render('register')
})



module.exports = routerRegister