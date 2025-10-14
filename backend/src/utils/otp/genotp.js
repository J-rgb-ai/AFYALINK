import crypto from 'crypto';
import redis from '../../config/redis/redis.js';

const OTP_EXPIRY = 20000; // dak mbili

const genotp = async (userId) => {
  
  const otp = crypto.randomInt(100000, 999999).toString();
  const key = `otp:${userId}`;
  const checkot = await redis.get(key);
  if(!checkot){

  await redis.set(key, otp, 'EX', OTP_EXPIRY,'NX');
  return otp;
}
throw new Error('You already requested for an otp');

};

export default genotp;