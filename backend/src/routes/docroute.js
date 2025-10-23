/**
 * doctor route
 */

import express from 'express';
import { addoc,docdash,addref } from '../controllers/docCtrl.js';


const docroute = express.Router();

docroute.post('/verify',addoc);
docroute.get('/dashboard',docdash);
docroute.post('/referrals/add',addref);



export default docroute;