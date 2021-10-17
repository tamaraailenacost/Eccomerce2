//Imprementar un Servidor basado en Node.js que utilice el middleware Express e
// impemente los siguientes endspoint en el puerto 8080
//Ruta get '/productos' que devuelve un array con todos los productos disponibles en el Servidor
//Ruta get '/productoRamdom' que devuelve un producto elegido al azar entre todos los productos.
//incluir el archivo de text 'productos.txt' y utilizar la clase Contenedor del desafio anterior.

const express = require('express')
const { Contenedor } = require("./Contenedor.js")

const app = express()
const PORT = 8080


const server = app.listen(PORT, () =>
    console.log("servidor corriendo"))

const data = new Contenedor('productos.txt')
const todo = data.getAll()


//const randomItem = todo[Math.floor(Math.random() * todo.length)];
//console.log(randomItem, "este es el random")


server.on("error", (error) => console.log(`error en el servidor ${error}`))

app.get('/productos', (req, resp) => {
    todo.then((result) => resp.send(result))
})

app.get('/productosRandom', (req, resp) => {
    todo.then((result) => resp.send(result[Math.floor(Math.random() * result.length)]))
})