// router
const { Router, response } = require('express')
const routerRegister = Router()
const userSchema = require('../../models/user')


routerRegister.post('/', async(req, res) => {
    console.log(req.body)
    const { password, password2, email, name } = req.body;
    if (password2 !== password) {
        throw new Error('password it is not the same')
    }
    //const newPassword = bcrypt.hashSync(password, 10)
    try {
        const user = new userSchema(req.body)
        await user.save()

    } catch (error) {
        console.log(error)
        throw new Error
    }

})

routerRegister.get('/', (req, res) => {

    res.render('register')
})



module.exports = routerRegister