const dotenv = require('dotenv')
dotenv.config()


const mongoose = require('mongoose');


const MongoConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_MONGO_HOST);
        console.log('cliente contectado a MongoDb Atlas');
    } catch (error) {
        console.log('error al conectarse a MongoDB Atlas', error)
        throw new Error
    }
}

module.exports = { MongoConnection }