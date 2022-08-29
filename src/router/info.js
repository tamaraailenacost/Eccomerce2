//Router Express
const { Router, response } = require('express')
const routerInfo = Router()

//log4js
const { log4js } = require('../../node_modules/log4js-module');
const log = log4js.getLogger();

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
    log.info("info del servidor");
    res.json(info())
})



module.exports = routerInfo