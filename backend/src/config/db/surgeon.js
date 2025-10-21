require('dotenv').config();
const createPool = require('./db');

const surgdb = createPool(process.env.SURGEON, process.env.SURGEONPASS);

module.exports = surgdb.promise();
