import express from 'express';

import { approveref1,refmandah,acceptref} from '../controllers/refctrl.js';

const refroute = express.Router();


refroute.post('/referrals/approve',approveref1);
refroute.all('/referrals/approve',(req,res,next) =>{ return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use POST`})});
refroute.get('/referrals/dashboard',refmandah);
refroute.all('/referrals/dashboard', (req,res,next)=>{return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use GET`})});
refroute.post('/referrals/approve',acceptref);
refroute.all('/referrals/accept',(req,res) =>{return res.status(405).json({error: `${req.method} not allowed on ${req.originalUrl} use POST`})});



export default refroute;