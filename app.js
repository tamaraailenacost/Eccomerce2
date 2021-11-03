const { Server } = require('./src/Server')


const server = new Server()

//Handlebars
const handlebars = require('express-handlebars');

server.app.engine('handlebars', handlebars());
server.app.set('view engine', 'handlebars');

server.app.get('/', function(req, res) {
    res.render('index');

});