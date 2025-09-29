require('dotenv').config();
const createPool = require('./db');

const pool = createPool(process.env.REF, process.env.REFPAS);
module.exports.ref_db = pool;
