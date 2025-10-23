
import express from 'express';
import { adminauth,admindash,adminlog,createadmin,deladmin,approveref} from '../controllers/adminctrl.js';




const adminroute = express.Router();

adminroute.get('/auth', adminauth);
adminroute.get('/dashboard',admindash);
adminroute.get('/logs',adminlog);
adminroute.put('/create',createadmin);
adminroute.post('/delete',deladmin);
adminroute.post('/approve',approveref);



export default adminroute;


