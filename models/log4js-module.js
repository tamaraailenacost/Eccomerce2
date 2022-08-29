const log4js = require('log4js')

log4js.configure({
  appenders: {
    consola: { type: "console" },
    warn: { type: 'file', filename: 'warn.log' },
    errores: { type: 'file', filename: 'errors.log' },
    loggerDebug: { type: 'logLevelFilter', appender: 'warn', level: 'warn' },
    loggerError: { type: 'logLevelFilter', appender: 'errores', level: 'error' }
  },
  categories: {
    default: { appenders: ["consola", "warn","errores","loggerDebug", "loggerError"], level: "trace" },
  }
 })

 module.exports = { log4js}