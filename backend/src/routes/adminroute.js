
import express from 'express';
import { adminauth,admindash,adminlog,createadmin,deladmin,approveref} from '../controllers/adminctrl.js';
import{blockip} from '../controllers/labtechctrl.js'



const adminroute = express.Router();

adminroute.get('/auth', adminauth);
adminroute.all('/auth',(req,res,next)=>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use GET`})});
adminroute.get('/dashboard',admindash);
adminroute.all('/dashboard',(req,res,next)=>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use GET`})});
adminroute.get('/logs',adminlog);
adminroute.all('/logs',(req,res,next)=>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use GET`})});
adminroute.put('/create',createadmin);
adminroute.all('/create',(req,res,next)=>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use PUT`})});
adminroute.post('/delete',deladmin);
adminroute.all('/delete',(req,res,next)=>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use POST`})});
adminroute.post('/approve',approveref);
adminroute.all('/approve',(req,res,next)=>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use POST`})});
adminroute.post('/block/ip',blockip);
adminroute.all('/block/ip',(req,res,next)=>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use POST`})});



export default adminroute;


