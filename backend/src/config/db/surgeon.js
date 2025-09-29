require('dotenv').config();
const createPool = require('./db');

const pool = await createPool(process.env.SURGEON, process.env.SURGEONPASS);

module.exports.surgeon_db = pool;