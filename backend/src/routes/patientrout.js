import express from 'express';
import { subpat,patdash } from '../controllers/patientctrl.js';


const patroute = express.Router();


patroute.post('/submit',subpat);
patroute.get('/dashboard',patdash);










export default patroute;