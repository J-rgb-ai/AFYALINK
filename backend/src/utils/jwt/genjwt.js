import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const gentok = (userID,role) =>{
    return jwt.sign({id:userID, role},process.env.JWT,{expiresIn: '1h'});
};

export default gentok;