const { Server } = require('./src/Server')

const server = new Server()


//Handlebars
const exphbs = require('express-handlebars');

server.app.engine('handlebars', exphbs());
server.app.set('view engine', 'handlebars');


server.app.get('/', function(req, res) {
    res.render('home');
});