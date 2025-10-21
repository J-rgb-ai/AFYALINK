const createPool = require('./db');
require('dotenv').config();

const docdb = createPool(process.env.DOCTOR,process.env.DOCTOR_PASS);

module.exports = docdb.promise();
