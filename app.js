const { Server } = require('./src/Server')

// Contenedor
const { Contenedor } = require('./Contenedor');

const server = new Server()

//authSession
const authSession = require('./src/authSession')

//Handlebars
const exphbs = require('express-handlebars');
server.app.engine('handlebars', exphbs());
server.app.set('view engine', 'handlebars');


server.app.get('/', authSession, function(req, res) {

    return res.render('home');
});