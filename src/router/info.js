//Router Express
const { Router, response } = require('express')
const routerInfo = Router()

//log4js
const { log4js } = require('../../models/log4js-module');
const log = log4js.getLogger();

//autocannon
const autocannon = require('autocannon')
const { PassThrough } = require('stream')


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

function run (url) {
    const buf = []
    const outputStream = new PassThrough()
  
    const inst = autocannon({
      url,
      connections: 40,
      duration: 20
    })
  
    autocannon.track(inst, { outputStream })
  
    outputStream.on('data', data => buf.push(data))
  
    inst.on('done', () => {
      process.stdout.write(Buffer.concat(buf))
    })
  }

run('http://localhost:3333/api/info')

routerInfo.get('/', (req, res) => {
    log.info("info del servidor");
    res.json(info())
})



module.exports = routerInfo