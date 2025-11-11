import express from 'express';

import { viewfac,addfac } from '../controllers/facilityctrl.js';


const facr = express.Router();

facr.get('/view/:fid',viewfac);
facr.all('/view/:fid',(req,res,next)=>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use GET`})});
facr.get('/view',viewfac);
facr.all('/view',(req,res,next)=>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl}. use GET`})});
facr.post('/add',addfac);
facr.all('/add',(req,res,next)=>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use POST`})});








export default facr;