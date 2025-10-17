
import express from 'express';
import { adminauth,admindash } from '../controllers/adminctrl.js';




const adminroute = express.Router();

adminroute.get('/auth', adminauth);
adminroute.get('/dashboard',admindash);



export default adminroute;


