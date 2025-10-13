import crypto from 'crypto';
import redis from '../../config/redis/redis.js';

const OTP_EXPIRY = 200; // dak mbili

export const genotp = async (userId) => {
  const otp = crypto.randomInt(100000, 999999).toString();
  const key = `otp:${userId}`;

  await redis.set(key, otp, 'EX', OTP_EXPIRY);
  return otp;
};

