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
        nombre: {
            type: String,
            required: false
        },
        apellido: {
            type: String,
            required: false
        },
        edad: {
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