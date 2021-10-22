//Imprementar un Servidor basado en Node.js que utilice el middleware Express e
// impemente los siguientes endspoint en el puerto 8080
//Ruta get '/productos' que devuelve un array con todos los productos disponibles en el Servidor
//Ruta get '/productoRamdom' que devuelve un producto elegido al azar entre todos los productos.
//incluir el archivo de text 'productos.txt' y utilizar la clase Contenedor del desafio anterior.

const { Contenedor } = require('./Contenedor.js')
const { Server } = require('./src/Server.js')


const server = new Server()
server.starting();
const data = new Contenedor('productos.txt')
const todo = data.getAll()
server.app.get('/productos', (req, resp) => {
    todo.then((result) => resp.send(result))
})

server.app.get('/productosRandom', (req, resp) => {
    todo.then((result) => resp.send(result[Math.floor(Math.random() * result.length)]))
})