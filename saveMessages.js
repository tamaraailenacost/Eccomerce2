const knexLib = require('knex');

class Messages {

    constructor(config) {

        this.knex = knexLib(config)
    }

    crearTabla = () => {
        return this.knex.schema.dropTableIfExists('mensajes')
            .finally(() => {
                return this.knex.schema.createTable('mensajes', table => {
                    table.increments('id').primary()
                    table.string('author', 50).notNullable()
                    table.string('message', 50).notNullable()
                })
            })
    }

    saveMessages = (mess) => {

        return this.knex('mensajes').insert(mess)
    }

    getMessages = () => {

        return this.knex('mensajes').select('*')
    }

}

module.exports = { Messages }