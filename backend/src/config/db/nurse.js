require('dotenv').config();
const createPool = require('./db');

const pool = await createPool(process.env.NURSE,process.env.NURSEPASS);

module.exports.nurse_db = pool;