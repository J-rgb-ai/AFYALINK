require('dotenv').config();
const createPool = require('./db');

const labdb = await createPool(process.env.LABT, process.env.LABTPASS);
module.exports = labdb.promise();
