require('dotenv').config();
const createPool = require('./db');

const dba = await cratePool(process.env.ADMIN, process.env.ADMINPASS);

module.exports = dba.promise();