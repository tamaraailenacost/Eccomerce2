const knexSqlite3 = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./mydb.sqlite"
    }
});

export { knexSqlite3 }