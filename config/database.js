const keys = require('./keys');

module.exports = {
    development: {
        username: keys.dbUsername,
        password: keys.dbPassword,
        database: keys.db,
        host: keys.dbHost,
        dialect: "mysql"
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql"
    },
    production: {
        username: "root",
        password: null,
        database: "database_production",
        host: "127.0.0.1",
        dialect: "mysql"
    }
}