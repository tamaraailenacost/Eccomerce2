// const knexLib = require('knex');

// class Contenedor {

//     constructor(config) {

//         this.knex = knexLib(config)
//     }

//     //crear tabla 
//     crearTabla = () => {
//         return this.knex.schema.dropTableIfExists('productos')
//             .finally(() => {
//                 return this.knex.schema.createTable('productos', table => {
//                     table.increments('idProd').primary()
//                     table.string('title', 50).notNullable()
//                     table.string('image', 50).notNullable()
//                     table.float('price')
//                     table.integer('stock')
//                 })
//             })
//     }


//     //update un producto a traves del formulario.
//     update = async(idProducto, stock) => {
//         const id = parseInt(idProducto)
//         return this.knex.from('productos').where('idProd', id).update({ stock: stock })

//     }


//     save = async(producto) => {

//         return this.knex('productos').insert(producto)

//     }

//     getAll = async() => {

//         return this.knex('productos').select('*')
//     }

//     getById = async(ID) => {

//         return this.knex.from('productos').where('idProd', ID).select('*')

//     }

//     deleteById = async(ID) => {


//         let id = parseInt(ID)
//         return this.knex.from('productos').where('idProd', id).del()

//     }


//     //Elimina todos los objetos presentes en el archivo.
//     deleteAll = async() => {
//         return await this.knex('productos').del()
//     }

//     close() {
//         this.knex.destroy();
//     }


// }


// module.exports = { Contenedor }