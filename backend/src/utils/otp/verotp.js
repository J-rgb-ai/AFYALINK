
import redis from "../../config/redis/redis.js";



const verotp = async (userId) => {
    const key = `otp:${userId}`;
    const storedOtp = await redis.get(key);
    console.log(storedOtp);
  
    /*if (!storedOtp) return false;
    if (storedOtp === inputOtp) return  true;
  */
    await redis.del(key); // one-time use //logic haimake sense kwanza kaa uko mavituuuu
   // return false;

    return storedOtp;
    
  };
  

  export default verotp;