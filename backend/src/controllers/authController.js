/*const ex = require('express');
const b = require('bcrypt');
const dba = require('../config/db/admin');
const r = require('../config/redis/redis');
const j = require('jsonwebtoken');


const jwsec = process.env.JWT;


exports.signup = async (req, res) => {
  const {
    fname, lname, email, phone,
    password, user_role = 'patient',
    gender, dob, facility_id
  } = req.body;



  const photo = req.file ? req.file.buffer : null;

  try {
    // Check for duplicates
    const [existing] = await dba.query(/*
      'SELECT id FROM users WHERE email = ? OR phone = ?',
      [email, phone]
   */
  /* );
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Email or phone already registered' });
    }



    //check if photo file is actually a photo








    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Calculate age
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();

    // Insert user
    await dba.query(/*
      `INSERT INTO users (
        fname, lname, email, phone, password_hash, user_role,
        gender, dob, age, photo, is_verified, facility_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [fname, lname, email, phone, password_hash, user_role,
       gender, dob, age, photo, false, facility_id]
   */ /*);

   const tok = j.sign({userId:existing.id,email:email},jwsec,{expiresIn:'1h'});

   
    res.setHeader({Athorization: tok});
    res.status(201).json({ message: 'User registered successfully' });






  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
**/

import express from 'express';
import dotenv from 'dotenv';
//import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../config/db/orm/ormmodels/user.js';
import gentok from '../utils/jwt/genjwt.js';
import Facility from '../config/db/orm/ormmodels/facility.js';
import vertok from '../utils/jwt/verjwt.js';





dotenv.config();



export const signup = async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      phone,
      password,
      user_role,
      gender,
      dob,
      facility_id
    } = req.body;

    // Basic validation
    if (!fname || !lname || !email || !password || !phone || !dob || !gender) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if(user_role === 'admin') return res.status(401).json({warning: 'You have no such privileges'});






    const birthDate = new Date(dob);
const today = new Date();
const age =
  today.getFullYear() -
  birthDate.getFullYear() -
  (today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()) ? 1 : 0);


    // Check for existing user
    const existing = await User.findOne({ where:  email ? {email}:{phone} });
    if (existing) {
      return res.status(409).json({ error: `Sorry User with those details already exists` });
    }

   
    // Hash password
    const password_hash = await bcrypt.hash(password, 10);
   

    // Create user
    const user = await User.create({
      fname,
      lname,
      email,
      phone,
      password_hash,
      user_role,
      gender,
      dob,
      age,
      facility_id
    });


    //get facility 

    const facid = user.facility_id;
    const fac = await Facility.findByPk(facid);

    const facname = fac?.fac_name || 'Unknown';
    const factype = fac?.fac_type || 'Unknown';


    // Generate JWT
    const token = 'Bearer '+ gentok(user.id, user.user_role);

    // Respond
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.user_role,
        age: user.age,
        verified: user.is_verified,
        facility: facname,
        facility_type: factype,
        joined: user.created_at
      },
      token
    });
  } catch (err) {
    console.error('Signup error:', err); // 👈 this will show the real issue
    res.status(500).json({ error: 'Failed to register user' });
  }
};



//login mf

export const login = async (req,res) =>{

  try{

const {email,phone,password} = req.body;


const user = await User.findOne({where: email ? { email } : { phone }});


if(!user) return res.status(404).json({error: 'User with those details not found'});
const passhash = user.password_hash;

const verify_user = await bcrypt.compare(password,passhash);

if(!verify_user) return res.status(401).json({error: 'Invalid details..'});

const token = 'Bearer ' + gentok(user.id, user.email || user.phone);

//get facilities ako ndani

const facid = user.facility_id;

const fac = await Facility.findByPk(facid);
const facname = fac?.fac_name || 'Unknown';
const factype = fac?.fac_type || 'Unknown';





res.status(200).json({
  message: 'Login succesful',
  user:{
    id: user.id,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    role: user.user_role,
    age: user.age,
    verified: user.is_verified,
    facility: facname,
    facility_type: factype,
    joined: user.created_at
  },
  token

});


  }
  catch(err){

    res.status(500).json({error: 'Failed to login user'});
    console.log(err.message);



  }




};


//user by id /user/:id

export const userbyid = async(req,res) =>{

  try{

    const id = req.params.id;


    if(!id) return res.status(401).json({error: 'missing user id'});

    if (!isNaN(parseInt(id))) {

      const ah = req.headers['authorization'];

      if(!ah) return res.status(401).json({error: 'Missing token'});

      if(!ah.startsWith('Bearer ')) return res.status(401).json({error: 'Invalid token format'});
      
      //token was created by user id and email or phone

      const token = ah.split(" ")[1];

      const decoded = vertok(token);

      if(!decoded) return res.status(401).json({error: 'Invalid or expired token or both '});

      const decid = decoded.id;
      const decem = decoded.email;
      const decop = decoded.phone;

      if(!(parseInt(decid) === parseInt(id))) return res.status(401).json({Bb: 'Nice try buddy'});

      console.log('going to the db now eh');

    

      const user = await  User.findByPk(id);
      if(!user) return res.status(404).json({error:'User does not exist'});

      const facid = user.facility_id;
      const fac = await Facility.findByPk(facid);
      const facname = fac?.fac_name || 'Unknown';
      const factype = fac?.fac_type || 'Unknown';
    

      //if(decem || decop){

    if((decem && decem === user.email) || (decop && decop === user.phone)) return res.status(401).json({error: 'Unathorized action was detected'}); 


      if(!user) return res.status(404).json({error: 'User not found'});

      res.status(200).json({
        message: `Welcome back ${user.fname}`,
        user:{
          id: user.id,
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          role: user.user_role,
          age: user.age,
          verified: user.is_verified,
          facility: facname,
          facility_type: factype,
          joined: user.created_at
        }
      })
    }

    





  }
  catch(err)
  {

    res.status(500).json({error: 'Failed to get user details'});
    console.log(err.message);


  }



}
  














