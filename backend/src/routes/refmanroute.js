import express from 'express';

import { approveref1,refmandah } from '../controllers/refctrl.js';

const refroute = express.Router();


refroute.post('/referrals/approve',approveref1);
refroute.get('/referrals/dashboard',refmandah);




export default refroute;