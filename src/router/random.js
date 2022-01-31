//Router Express
const { Router, response } = require('express')
const routerRandom = Router()
const { fork } = require('child_process')
const forked = fork("child.js")


/*
Agregar otra ruta '/api/randoms' que permita calcular un cantidad de números aleatorios 
en el rango del 1 al 1000 especificada por parámetros de consulta (query).
Por ej: /randoms?cant=20000.
Si dicho parámetro no se ingresa, calcular 100.000.000 números.
El dato devuelto al frontend será un objeto que contendrá como claves los números 
random generados junto a la cantidad de veces que salió cada uno. Esta ruta no será 
bloqueante (utilizar el método fork de child process). Comprobar el no bloqueo con una 
cantidad de 500.000.000 de randoms.
*/

routerRandom.get('/:num?', (req, res) => {

    const cant = req.params;
    forked.send(cant)
    forked.on('message', msg => {
        console.log("mensaje del hijo", msg);
        res.json(msg);
    });

});

module.exports = routerRandom