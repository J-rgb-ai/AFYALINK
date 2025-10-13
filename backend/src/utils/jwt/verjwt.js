import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const vertok = (token) =>{
    try{
        return jwt.verify(token,process.env.JWT);

    }
    catch(err)
    {
        throw new Error('Invalid or expired token');
    }
};


export default vertok;