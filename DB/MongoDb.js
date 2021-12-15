// getting-started.js
const mongoose = require('mongoose');


const MongoConnection = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/test');
        console.log('cliente contectado a MongoDb');
    } catch (error) {
        console.log('error al conectarse a MongoDB', error)
        throw new Error
    }
}

module.exports = { MongoConnection }