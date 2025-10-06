require('dotenv').config();
const createPool = require('./db');

const dba = await createPool(process.env.ADMIN, process.env.ADMINPASS);

module.exports = dba.promise();