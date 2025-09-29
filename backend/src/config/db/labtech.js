require('dotenv').config();
const createPool = require('./db');

const pool = await createPool(process.env.LABT, process.env.LABTPASS);
module.exports.labtech_db = pool;
