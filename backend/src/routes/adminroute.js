
import express from 'express';
import { admindash } from '../controllers/adminctrl.js';




const adminroute = express.Router();

adminroute.get('/dashboard', admindash);



export default adminroute;


