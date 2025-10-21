require('dotenv').config();
const createPool = require('./db');

const nursedb = createPool(process.env.NURSE,process.env.NURSEPASS);

module.exports = nursedb.promise();
