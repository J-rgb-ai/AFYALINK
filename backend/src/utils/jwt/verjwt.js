import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const vertok = (token) =>{
    try{
        return jwt.verify(token,process.env.JWT);

    }
    catch(err)
    {
        return res.status(403).json({error:'Invalid or expired token'});
    }
};


export default vertok;