import express from 'express';

import { viewfac,addfac,facpic,facviup } from '../controllers/facilityctrl.js';
import { upload } from '../utils/uploads/picture.js'


const facr = express.Router();

facr.get('/view/:fid',viewfac);
facr.all('/view/:fid',(req,res,next)=>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use GET`})});
facr.get('/view',viewfac);
facr.all('/view',(req,res,next)=>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use GET`})});
facr.post('/add',addfac);
facr.all('/add',(req,res,next)=>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use POST`})});
facr.post('/upload/photo',upload.single('photo'),facpic);
facr.all('/upload/photo',async(req,res)=>{return res.status(405).json({error: `${req.method} not allowed on ${req.originalUrl} use POST`})});
facr.get('/:fid/photo',facviup);
facr.all('/:fid/photo',(req,res,next)=>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use GET`})});









export default facr;