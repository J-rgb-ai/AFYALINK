import express from 'express';
import { addnus,nursedash } from '../controllers/nursectrl.js';
import { createrefah,addviz } from '../controllers/refctrl.js';

const nurseroute = express.Router();


nurseroute.post('/verify',addnus);
nurseroute.all('/verify',(req,res,next)=>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use POST`})});
nurseroute.get('/dashboard', nursedash);
nurseroute.all('/dashboard',(req,res,next)=>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use GET`})});
nurseroute.post('/referrals/create',createrefah);
nurseroute.all('/referrals/create',(req,res,next)=> {  return res.status(405).json({error: `${req.method} not allowed on ${req.originalUrl} use POST`})});
nurseroute.post('/visits/create',addviz);
nurseroute.all('/visits/create',(req,res,next)=>{return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} especially at ${new Date()} use POST`})});








export default nurseroute;