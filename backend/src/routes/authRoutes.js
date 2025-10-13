/*const ex = require('express');
const r = ex.Router();
const signup = require("../controllers/authController");



r.post("/signup",express.json(), signup);
//router.post("/login", login);


module.exports = r;
*/


import express from 'express';
import { signup,login } from '../controllers/authController.js';


const userrouter = express.Router();

userrouter.post('/signup',signup);
userrouter.post('/signin',login);



export default userrouter;


