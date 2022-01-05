// getting-started.js
const mongoose = require('mongoose');


const MongoConnection = async() => {
    try {
        await mongoose.connect('mongodb+srv://tamaraacosta:Trebol4318@cluster0.a8wit.mongodb.net/test');
        console.log('cliente contectado a MongoDb Atlas');
    } catch (error) {
        console.log('error al conectarse a MongoDB Atlas', error)
        throw new Error
    }
}

module.exports = { MongoConnection }