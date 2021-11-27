const knexMariaDB = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        database: 'test'
    }
}

const knexSqlite3 = {
    client: 'sqlite3',
    connection: {
        filename: "./test.sqlite"
    },
    useNullAsDefault: true
}


module.exports = { knexSqlite3, knexMariaDB }