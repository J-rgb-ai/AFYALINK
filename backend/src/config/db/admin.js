require('dotenv').config();
const createPool = require('./db');

const pool = await createPool(process.env.ADMIN, process.env.ADMINPASS);

module.exports.admin_db = pool;