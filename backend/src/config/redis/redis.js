import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis({
    host: process.env.DB_HOST,
    port: process.env.RED_PORT,
    password: process.env.RED_PASS,
    db: 0,
});

redis.on('connect',()=> {console.log('Redis connected')});
redis.on('error',()=> {console.log(`Redis failed ${error}`)});

export default redis;



