require('dotenv').config();
const createPool = require('./db');

const pool = await createPool(process.env.SEC, process.env.SECPAS);

module.exports.sec_db = pool;