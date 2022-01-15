//Router Express
const { Router, response } = require('express')
const routerInfo = Router()


//Path de ejecución
const path = process.execArgv
    //sistema operativo
const os = process.platform
    //Process id
const id = process.pid
    //Versión de node.js 
const version = process.version
    //Carpeta del proyecto
const cwd = process.cwd()
    //Memoria total reservada 
const memory = process.memoryUsage()



const info = () => {

    return `info: ${id} 
                ${os}- 
                ${id}-
                ${version}- 
                ${cwd}-
                ${memory}`

}

routerInfo.get('/', (req, res) => {

    res.json(info())
})



module.exports = routerInfo