//Router Express
const { Router, response } = require('express')
const routerRandom = Router()


process.stdin.on('data', (data) => {

    process.stdout.write('Ingrese un numero \n')

})



routerRandom.get('/:num?', (req, res) => {

    const num = req.params
    const acum = []
    if (num === undefined) {
        num = 1000000
    }
    const random = Math.floor(Math.random(num) * 100)
    acum.push(random)


    /*El dato devuelto al frontend será un objeto que contendrá como claves los números 
    random generados junto a la cantidad de veces que salió cada uno. Esta ruta no será 
    bloqueante (utilizar el método fork de child process). Comprobar el no bloqueo con una 
    cantidad de 500.000.000 de randoms.
    */
    res.json(acum)

})



module.exports = routerRandom