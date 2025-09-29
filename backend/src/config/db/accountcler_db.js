require('dotenv').config();
const createPool = require('./db');

const pool = await createPool(process.env.ACCLERK, process.env.ACCLPASS);

module.exports.acclerk_db = pool;