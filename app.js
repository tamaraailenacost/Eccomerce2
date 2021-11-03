const { Server } = require('./src/Server')

<<<<<<< HEAD

const server = new Server()

//Handlebars
const handlebars = require('express-handlebars');

server.app.engine('handlebars', handlebars());
server.app.set('view engine', 'handlebars');

server.app.get('/', function(req, res) {
    res.render('index');

});
=======
const server = new Server()
>>>>>>> 0aefeceb2dc40a8d08a02a2160f5c995a81809ae
