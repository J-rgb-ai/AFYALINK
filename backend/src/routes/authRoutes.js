/*const ex = require('express');
const r = ex.Router();
const signup = require("../controllers/authController");



r.post("/signup",express.json(), signup);
//router.post("/login", login);


module.exports = r;
*/


import express from 'express';
import { signup,login,userbyid,forgotpass,resetpass,veremail } from '../controllers/authController.js';


const userrouter = express.Router();

userrouter.post('/signup',signup);
userrouter.all('/signup',(req,res,next)=>{return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use POST`})});
userrouter.post('/signin',login);
userrouter.all('/signin',(req,res,next)=>{return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use POST`})});
userrouter.get('/:id',userbyid);
userrouter.all('/:id',(req,res,next)=>{return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use GET`})});
userrouter.post('/forgotpass',forgotpass);
userrouter.all('/forgotpass',(req,res,next)=>{return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use POST`})});
userrouter.put('/resetpass',resetpass);
userrouter.all('/resetpass',(req,res,next)=>{return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use PUT`})});
userrouter.post('/verify/email',veremail);
userrouter.all('/verify/email',(req,res,next)=>{return res.status(405).json({warn: `${req.method} not allowed on ${req.originalUrl} use POST`})});


export default userrouter;


