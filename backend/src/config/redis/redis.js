const {createClient} = require('redis');
const redis = createClient();
redis.connect().catch(err => console.log('Redis connection failed, continuing without Redis:', err.message));
module.exports = redis;

