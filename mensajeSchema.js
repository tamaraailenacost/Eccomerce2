const { Schema, model } = require('mongoose');


const mensajeSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    }
    /*timestamp: {
        type: Date,
        required: false,
    }*/

});


module.exports = model('Mensajes', mensajeSchema);