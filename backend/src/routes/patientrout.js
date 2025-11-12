import express from 'express';
import { subpat,patdash } from '../controllers/patientctrl.js';


const patroute = express.Router();


patroute.post('/submit',subpat);
patroute.all('/submit',(req,res,next) =>{ return res.status(405).json({error: `${req.method} not allowed on ${req.originalUrl} use POST`})});
patroute.get('/dashboard',patdash);
patroute.all('/dashboard',(req,res,next)=>{return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl}`})});










export default patroute;