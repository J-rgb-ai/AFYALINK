import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import express from 'express';
//import { request } from 'http';
//import { response } from 'express';
dotenv.config();

//const res = response;


const vertok = (token) =>{
    try{
        return jwt.verify(token,process.env.JWT);

    }
    catch(err)
    {
        //return res.status(403).json({error:'Invalid or expired token'});
        return ;
    }
};


export default vertok;