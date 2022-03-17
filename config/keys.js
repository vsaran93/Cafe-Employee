const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    db: process.env.DB,
    dbHost: process.env.DB_HOST,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD
}