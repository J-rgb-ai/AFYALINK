/**
 * doctor route
 */

import express from 'express';
import { addoc,docdash,addref } from '../controllers/docCtrl.js';
import { createrefah,addviz } from '../controllers/refctrl.js';


const docroute = express.Router();

docroute.post('/verify',addoc);
docroute.all('/verify',(req,res,next)=>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use POST`})});
docroute.get('/dashboard',docdash);
docroute.all('/dashboard',(req,res,next)=>{return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use GET`})});
docroute.post('/referrals/add',addref);
docroute.all('/referrals/add',(req,res,next)=>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use POST`})});
docroute.post('/referrals/create', createrefah);
docroute.all('/referrals/create',(req,res,next)=>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use POST`})});
docroute.post('/visits/create',addviz);
docroute.all('/visits/create',(req,res,next)=>{return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} especially at ${new Date()} use POST`})});


export default docroute;