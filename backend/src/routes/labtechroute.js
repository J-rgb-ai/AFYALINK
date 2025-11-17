import express from 'express';

import { labtdah,addt } from '../controllers/labtechctrl.js';
import { createrefah,addviz } from '../controllers/refctrl.js';


const  labr = express.Router();

labr.post('/submit',addt);
labr.all('/submit',(req,res,next)=>{ return res.status(405).json({error: `${req.method} not allowed on ${req.originalUrl} use POST`})});
labr.get('/dashboard',labtdah);
labr.all('/dashboard',(req,res,next)=>{ return res.status(405).json({error: `${req.method} not allowed on ${req.originalUrl} : ${new Date().toLocaleString()} use GET`})});
labr.post('/referrals/create', createrefah);
labr.all('/referrals/create',(req,res,next) =>{ return res.status(405).json({error: `${req.method} not allowed on ${req.originalUrl} use POST`})});
labr.post('/visits/create',addviz);
labr.all('/visits/create',(req,res,next)=>{return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} especially at ${new Date()} use POST`})});






export default labr;