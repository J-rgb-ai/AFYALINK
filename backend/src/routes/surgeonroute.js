import express from 'express';
import { addsug,sugdah } from '../controllers/surgeonctrl.js';
import { createrefah,addviz } from '../controllers/refctrl.js';

const surgr = express.Router();



surgr.post('/submit', addsug);
surgr.all('/submit',(req,res,next)=>{ return res.status(405).json({error: `${req.method} not permitted on ${req.originalUrl} use POST`})});
surgr.get('/dashboard',sugdah);
surgr.all('/dashboard', (req,res,next)=>{return res.status(405).json({error: `${req.method} not allowed on ${req.originalUrl} use GET`})});
surgr.post('/referrals/create',createrefah);
surgr.all('/referrals/add', (req,res,next)=>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use POST`})});
surgr.post('/visits/create',addviz);
surgr.all('/visits/create',(req,res,next)=>{return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} especially at ${new Date()} use POST`})});






export default surgr;


