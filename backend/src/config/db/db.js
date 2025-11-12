/*require('dotenv').config();
const db = require('mysql2');

module.exports = async function cratePool(user,password) {
     return db.createPool({
    host: process.env.DB_host,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user,
    password,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}
)};*/

