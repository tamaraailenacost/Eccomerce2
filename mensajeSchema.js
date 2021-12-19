const { Schema, model } = require('mongoose');


const mensajeSchema = new Schema({

    message: {
        type: String,
        required: true
    },
    author: {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: false
        },
        surename: {
            type: String,
            required: false
        },
        phone: {
            type: String,
            required: false
        },
        avatar: {
            type: String,
            required: false
        },
        alias: {
            type: String,
            required: false
        }
    }

});


module.exports = model('Mensajes', mensajeSchema);