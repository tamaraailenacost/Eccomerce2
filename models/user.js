const { Schema, model } = require('mongoose')



const userSchema = new Schema({

    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    login: {
        type: Boolean,
        default: true,
        required: true
    },
    rol: {
        type: String,
        required: true,
        default: 'user',
        enum: ['admin', 'user']
    },

})

module.exports = model('usuario', userSchema)