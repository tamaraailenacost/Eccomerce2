const { Server } = require('./src/Server')
const server = new Server()

//dotenv .env
const dotenv = require('dotenv')
dotenv.config()

//authSession
const authSession = require('./src/authSession')

//Handlebars
const exphbs = require('express-handlebars');
server.app.engine('handlebars', exphbs());
server.app.set('view engine', 'handlebars');


server.app.get('/', authSession, function(req, res) {

    return res.render('home');
});