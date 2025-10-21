require('dotenv').config();
const createPool = require('./db');

const secdb = createPool(process.env.SEC, process.env.SECPAS);

module.exports = secdb.promise();
