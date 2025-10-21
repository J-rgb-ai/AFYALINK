require('dotenv').config();
const createPool = require('./db');

const labdb = createPool(process.env.LABT, process.env.LABTPASS);

module.exports = labdb.promise();
