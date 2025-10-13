
import redis from "../../config/redis/redis.js";



export const verotp = async (userId, inputOtp) => {
    const key = `otp:${userId}`;
    const storedOtp = await redis.get(key);
  
    if (!storedOtp) return false;
    if (storedOtp !== inputOtp) return  false;
  
    await redis.del(key); // one-time use
    return  true;
  };
  