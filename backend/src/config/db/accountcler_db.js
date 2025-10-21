require('dotenv').config();
const createPool = require('./db');

const accdb = createPool(process.env.ACCLERK, process.env.ACCLPASS);

module.exports.acclerk_db = accdb.promise();
