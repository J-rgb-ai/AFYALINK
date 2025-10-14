import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const gentok = (id,email,phone,role) =>{
    return jwt.sign({id,email,phone, role},process.env.JWT,{expiresIn: '1h'});
};

export default gentok;