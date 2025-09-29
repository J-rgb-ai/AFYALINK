const createPool = require('./db');
require('dotenv').config;

const pool = await createPool(process.env.DOCTOR,process.env.DOCTOR_PASS);

module.exports.doctor_db =pool;

