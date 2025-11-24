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


//kila place iko na req.boy eka template msee akikosa kueka...TODO

import express from 'express';
import dotenv from 'dotenv';
//import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
//import User from '../config/db/orm/ormmodels/user.model.js';
import gentok from '../utils/jwt/genjwt.js';
//import Facility from '../config/db/orm/ormmodels/facility.model.js';
//import Doctor from '../config/db/orm/ormmodels/doctors.model.js';
import vertok from '../utils/jwt/verjwt.js';
import genotp from '../utils/otp/genotp.js';
import verotp from '../utils/otp/verotp.js';
import { Fn } from 'sequelize/lib/utils';
import { sendotpmail,sendregmail,respasmail } from '../utils/mail/mailer.js';
import redis from '../config/redis/redis.js';
//import Patient from '../config/db/orm/ormmodels/patients.model.js';
//import userrouter from '../routes/authRoutes.js';
//import Nurse from '../config/db/orm/ormmodels/nurse.model.js';
//import Surgeon from '../config/db/orm/ormmodels/surgeon.model.js';
//import Labtech from '../config/db/orm/ormmodels/labtechs.model.js';
import { format } from 'morgan';
import models from '../config/db/orm/sequalize.js';
import { Op, where } from 'sequelize';

const{User,Facility,Doctor,Patient,Nurse,Surgeon,Labtech} = models;




dotenv.config();


const emailreg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


function capfast(str){
  if(typeof str !== 'string' || str.length === 0) return ' ';

  return str.charAt(0).toLocaleUpperCase() + str.slice(1);

}

//TODO
/* Get a working whatsapp bot by whatsappwebjs to send otps*/


export const signup = async (req, res) => {
  try {

const fori = {
  fname: "Linet",
  lname: "atieno",
  email: "linetatieno@gmail.com",
  phone: "+254712345678",
  password: "SecurePass@2025",
  user_role: "labtech",
  gender: "female",
  dob: "1992-08-15",
  facility_id: 7
};


if(!req.body) return res.status(403).json({error: 'Missing request body', format: fori});





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
      return res.status(400).json({ error: 'Missing required fields', format: fori });
    }
    const valemal = emailreg.test(email);

    if(!valemal) return res.status(400).json({error: 'Invalid email format'});
    const fcin = parseInt(facility_id);
    if(isNaN(fcin)) return res.status(422).json({error: 'Facility id must be an integer only'});
    const facok = await Facility.findByPk(facility_id);
    if(!facok) return res.status(404).json({error:'No such facility with that id'});
    if(!facok.is_active) return res.status(403).json({error:`Facility of id ${facility_id} is not active at the moment`});
    const anin = await User.findOne({where:{facility_id: facility_id,user_role: 'admin'}});
    if(!anin) return res.status(400).json({error:'Please intialize system first before user creation'}); 
    const cha = await User.findAll({where:{facility_id: facility_id,user_role:{[Op.in]:['admin','iadmin']}}});
    if(cha.length >= 2) return res.status(422).json({error:'Missing user role'});

    if(user_role === 'admin' || user_role === 'iadmin') return res.status(401).json({warning: 'You have no such privileges'});






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

    //why this block not executing..idk
    const ext = await User.findOne({where:{phone}});
    if(ext) return res.status(409).json({error:'Phone no already registered before'});


    //yeah now we look at it oh yeah

    if( user_role === 'refmanager' || user_role === 'refmanagertobe') {

      //do refmanager shii

      const password_hash = await bcrypt.hash(password,10);
      const user_role = 'refmanagertobe';

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

      if(!user) throw new Error('Could not create user');
      const facid = user.facility_id;
    const fac = await Facility.findByPk(facid);

    const facname = fac?.fac_name || 'Unknown';
    const factype = fac?.fac_type || 'Unknown';

    const token = 'Bearer '+ gentok(user.id, user.email,user.phone,user.user_role);
    const otp = await genotp(user.id);
    console.log(otp); //get rid of it in production usisahau we mzee
    await sendotpmail(user.email,otp);


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

  

    const regname = capfast(user.fname) + ' ' + capfast(user.lname);
   // const regrole = capfast(user.user_role);
    const regstat = capfast(user.is_verified) + " " + 'Please verify email';
   const regfac = capfast(factype);
const template = `<html>

<head>
  <meta charset="UTF-8">
  <title>Afyalink Registration</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      padding: 20px;
      color: #333;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 20px;
      max-width: 600px;
      margin: auto;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    h2 {
      color: #2c3e50;
    }
    .label {
      font-weight: bold;
      color: #555;
    }
    .value {
      margin-bottom: 10px;
    }
    .footer {
      margin-top: 20px;
      font-size: 0.9em;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Congratulations for registering with  afyalink today</h2>
    <p class="value"><span class="label">Name:</span> ${regname}</p>
    <p class="value"><span class="label">Email:</span> ${user.email}</p>
    <p class="value"><span class="label">Role:</span> Requested for Referral manager</p>
    <p class="value"><span class="label">Age:</span> ${user.age}</p>
    <p class="value"><span class="label">Verified:</span> ${regstat} </p>
    <p class="value"><span class="label">Facility:</span> ${facname}</p>
    <p class="value"><span class="label">Facility Type:</span> ${regfac} </p>
    <p class="value"><span class="label">Joined:</span> ${user.created_at}</p>

    <div class="footer">
      Thank you for registering with Afyalink. If you have any questions, please hesitate to reach out.
    </div>
  </div>
</body>
</html>
`;


///congrats to user for registering
await sendregmail(user.email,template);



    }

  else   if(user_role !==  'refmanager' || user_role !== 'refmanagertobe')
{
   
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
    const token = 'Bearer '+ gentok(user.id, user.email,user.phone,user.user_role);
    const otp = await genotp(user.id);
    console.log(otp); //get rid of it in production usisahau we mzee
    await sendotpmail(user.email,otp);


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

  

    const regname = capfast(user.fname) + ' ' + capfast(user.lname);
    const regrole = capfast(user.user_role);
    const regstat = capfast(user.is_verified) + " " + 'Please verify email';
   const regfac = capfast(factype);
const template = `<html>

<head>
  <meta charset="UTF-8">
  <title>Afyalink Registration</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      padding: 20px;
      color: #333;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 20px;
      max-width: 600px;
      margin: auto;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    h2 {
      color: #2c3e50;
    }
    .label {
      font-weight: bold;
      color: #555;
    }
    .value {
      margin-bottom: 10px;
    }
    .footer {
      margin-top: 20px;
      font-size: 0.9em;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Congratulations for registering with  afyalink today</h2>
    <p class="value"><span class="label">Name:</span> ${regname}</p>
    <p class="value"><span class="label">Email:</span> ${user.email}</p>
    <p class="value"><span class="label">Role:</span> ${regrole}</p>
    <p class="value"><span class="label">Age:</span> ${user.age}</p>
    <p class="value"><span class="label">Verified:</span> ${regstat} </p>
    <p class="value"><span class="label">Facility:</span> ${facname}</p>
    <p class="value"><span class="label">Facility Type:</span> ${regfac} </p>
    <p class="value"><span class="label">Joined:</span> ${user.created_at}</p>

    <div class="footer">
      Thank you for registering with Afyalink. If you have any questions, please hesitate to reach out.
    </div>
  </div>
</body>
</html>
`;


///congrats to user for registering
await sendregmail(user.email,template);

  }

  } catch (err) {
    console.error('Signup error:', err); // 👈 this will show the real issue i mean it should but it may not still 
    res.status(500).json({ error: 'Failed to register user' });
  }
};

//verify email

export const veremail = async (req,res) =>{

try{
  if(!req.body)   throw new Error('Missing request body');

  const {otp} = req.body;

  const ah = req.headers['authorization'];
  
  if(!ah) return res.status(401).json({error: 'Missing token'});
  if(!otp) return res.status(401).json({error: 'Missing otp field'});
  if(!(ah.startsWith("Bearer "))) return res.status(401).json({error: 'Invalid token format'});
  const token = ah.split(" ")[1];
  const decoded = vertok(token);

  if(!decoded) return res.status(401).json({error: 'Invalid or expired token'});

  const id = decoded.id;
  //console.log(id);
  const email = decoded.email;


  const user = await User.findByPk(id);
  if(!user) return res.status(401).json({error: 'Something went wrong with the db'})
    if(email !== user.email) return res.status(403).json({error:'Bad boy'}) ;
    if(user.is_verified) return res.status(200).json({heads: 'Email had already been verified'});
    if(user.is_verified === false){

      //const ttl = await redis.ttl(`otp:${user.id}`);



        const stordo = await verotp(user.id);
        if(stordo !== otp) return res.status(401).json({error:'Invalid otp'});
        await User.update({is_verified: true},{where: {email}});
        res.status(201).json({success: 'Email verified succesful'}); //if only i was a good dev man...am not even trying
        //like wtf is this trashy cide man..I expected much more from you
      
    }

}
catch(err)
{

  console.log(err.message);
  res.status(500).json({error: 'Could not verify email'});


}



};





//login mf

export const login = async (req,res) =>{

  try{

const fori = {
  email: 'lonelyking@gmail.com',
  password: 'Lockedin34@'
};


if(!req.body) return res.status(400).json({error: 'Missing request body', format: fori});
  const {email,phone,password} = req.body;
if(!password || !(email || phone) ) return  res.status(422).json({error: 'Please fill in the necessary details', format: fori}); 

const checkm = emailreg.test(email);

if(!checkm) return res.status(401).json({error: 'Please enter a valid email '});

const user = await User.findOne({where: email ? { email } : { phone }});
const t0x56 = new Date().getTime();
const dt0x56 = user.dis_un;
const d0x56 = t0x56 - dt0x56;
const m0x56 = Math.floor(d0x56/(1000*60));


if(!user) return res.status(404).json({error: 'User with those details not found'});

if(m0x56 > 15)
{
  user.wrong = 0;
  user.disabled = false;
  await user.save();
}


if(user.disabled) return res.status(403).json({error:`Account was disabled please wait for ${m0x56} minutes`});

const passhash = user.password_hash;

const verify_user = await bcrypt.compare(password,passhash);



if(user.wrong > 5){
  const t0x4 = new Date().getTime() + (15*60*1000);
  user.dis_res = 'Too many incorrect login attempts';
  user.dis_un = t0x4;
  user.disabled = true;
  const l0x566 = user.no_dis;
  user.no_dis = l0x566 + 1;
  await user.save();

  return res.status(403).json({error: `Too many login attempts please try again after ${Math.floor(t0x56/(1000*60*60))} minutes..`})


}



if(!verify_user) {
  
   const i0x45 = user.wrong;
   user.wrong = i0x45 + 1;
   await user.save();

  return res.status(401).json({error: 'Invalid details..'})
}

if(verify_user) {
  user.wrong = 0;
  await user.save();
}


const facid = user.facility_id;

const fac = await Facility.findByPk(facid);
const facname = fac?.fac_name || 'Unknown';
const factype = fac?.fac_type || 'Unknown';


if(user.user_role === 'admin' || user.user_role === 'iadmin') {

  //token admin atapewa uku ataenda nayo admin/auth

  const adminpay = { message: `Welcome admin ${user.fname}`,
                    admin:{
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
                    }};

if(!user.is_verified){

  const token = 'Bearer ' + gentok(user.id,user.email || user.phone);
  const otp = await genotp(user.id);
  await sendotpmail(user.email,otp);
  return res.status(401).json({
    Message: "please verify user first",
    verfificationToken: token
  });
}

const admintok = 'Bearer ' +  gentok(adminpay);
const otp = await  genotp(user.id);
console.log(`The otp  ${otp} was generated for admin`);

//TODO add a subject as param in send otpmail func..au sio
await sendotpmail(user.email,otp);


return res.status(200).json({
    adminpay,
    admintoken: admintok
        
});

//TODO send otp if user is admin
  

}

else if (user.role === 'patient' && user.is_verified)
{
const pid = user.id;
  const np1 = await Patient.findOne({where:{user_id:pid}});
  if(!np1) {
    const token = 'Bearer ' + gentok(user.id, user.email || user.phone);
    const facid = user.facility_id;

const fac = await Facility.findByPk(facid);
const facname = fac?.fac_name || 'Unknown';
const factype = fac?.fac_type || 'Unknown';


  return  res.status(200).json({
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
      usertoken: token
    
    });

  }  

     const np2 = await Patient.findOne({where:{user_id:pid}});

     if(!np2) return res.status(401).json({error:'User has not full submitted patient details'});


     const papey = {
      message: `Welcome ${user.fname} ${user.lname}`,
      patient:{
        id:np2.id,
        userId:np2.user_id,
        national_id: np2.national_id,
        blood_type: np2.blood_type,
        chronic_conditions:np2.chronic_conditions,
        emergency_cont_name: np2.emergency_cont_name,
        emergency_cont_phone: emergency_cont_phone,
        is_insured: np2.is_insured,
        insurance_type: np2.insurance_type

      }
     };



     const patok = 'Bearer ' + papey;

     res.status(200).json({
      papey,
      patient_token:patok
     });


}



else if(user.role === 'nurse' && user.is_verified)
{

const nid = user.id;
const n1 = await Nurse.findOne({where:{user_id:nid}});
if(!n1) {
  const token = 'Bearer ' + gentok(user.id,user.email,user.phone);
  const facid = user.facility_id;
  const fac = await Facility.findByPk(facid);
const facname = fac?.fac_name || 'Unknown';
const factype = fac?.fac_type || 'Unknown';


  return  res.status(200).json({
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
      usertoken: token
    
    });

}

const nursep = {
  message: `Welcome Nurse ${user.fname} ${user.lname}`,
  nurse:{
      id: user.id,
      name: `${user.fname} ${user.lname}`,
      license_number: n1.license_number,
      cadre: n1.cadre,
      qualification: n1.qualification,
      experience: n1.years_experience,
      role: user.user_role,
      specialist: n1?.is_specialist || "Not a specialist",
      speciality: n1?.speciality || "Not specialized in any field",
      verified: user.is_verified,
      verified_at: n1.created_at
       }
};


const nt = 'Bearer ' + gentok(nursep);

return res.status(200).json({nursep,nurse_token: nt});



}



else if(user.user_role === 'doctor' && user.is_verified){


  const did = user.id;

  const nd1 = await Doctor.findOne({where:{user_id:did}});
  if(!nd1) {
    const token = 'Bearer ' + gentok(user.id, user.email || user.phone);
    const facid = user.facility_id;

const fac = await Facility.findByPk(facid);
const facname = fac?.fac_name || 'Unknown';
const factype = fac?.fac_type || 'Unknown';


  return  res.status(200).json({
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
      usertoken: token
    
    });

  }  

  else{

  const nd = await Doctor.findOne({where:{user_id:did}});
  if(!nd) return res.status(403).json({error:'User is not a qualified or verified doctor'});
  const lic = nd.license_number;
  const saj = await Surgeon.findOne({where:{license_number:lic}});
  if(saj){


    const sgp = {
      message: `Welcome back surgeon ${user.fname} ${user.lname}`,
      surgeon:{
          surgeonId: saj.id,
          userId: user.id,
          doctorId: nd.id,
          name: `${user.fname} ${user.lname}`,
          lic_no: saj.license_number,
          verified: user.is_verified,
          experience: saj.years_experience,
          facilty: `${facname} (${factype})`,
          is_consultant: saj?.is_consultant,
          is_specialist: nd.is_specialist,
          speciality: nd?.speciality || 'Not a specialist',
          created_at: nd.created_at
      }
  };

  const surt = 'Bearer ' + gentok(sqp);

  return res.status(200).json({sgp, surgeon_token: surt});





  }


  else if(!saj) {


  const docp = {
    message:`welcome doctor ${user.fname}`,
    doctor:{
    name: `${user.fname} ${user.lname}`,
    docid: nd.id,
    userId: user.id,
    age:user.age,
    lic_no: nd.license_number,
    is_spec: nd.is_specialist,  //do some corrections here later to avoid undefined
    spec: nd.speciality,
    qualf: nd.qualification,
    role: user.user_role,
    verified: user.is_verified,
    experience: nd.years_experience,
    consultant: nd.is_consultant,
    created: user.created_at,
    doc_since: nd.created_at,

    }
};


const doctok = 'Bearer ' + gentok(docp);

return res.status(200).json({
  docp,
  doctor_token: doctok
});
}}

}
else if(user.user_role === 'refmanager'){


  const refpay = { message: `Welcome Referral Manager  ${user.fname}`,
  refmanager:{
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
  }};


  

if(!user.is_verified){

const token = 'Bearer ' + gentok(user.id,user.email || user.phone);

 const otp = await genotp(user.id);
 console.log(`The otp  ${otp} was generated for referral manager`);

await sendotpmail(user.email,otp);
return res.status(401).json({
Message: "please verify user first",
verfificationToken: token
});
}

const reftok = 'Bearer ' +  gentok(refpay);
//const otp = await  genotp(user.id);

//TODO add a subject as param in send otpmail func..au sio
//await sendotpmail(user.email,otp);


return res.status(200).json({
refpay,
reftoken: reftok

});









}


else if(user.user_role === 'labtech' && user.is_verified)
  {
  //do labtech shii over here 
  
  const lid = user.id;
  const lbs = await Labtech.findOne({where:{user_id:lid}});
  const facid = user.facility_id;
  const fac = await Facility.findByPk(facid);
  const facname = fac?.fac_name || 'Unknown';
  const factype = fac?.fac_type || 'Unknown';
  
  //console.log(lbs);
  if(!lbs){
  
    const token = 'Bearer ' + gentok(user.id, user.email || user.phone);
      
  
  
  
    return  res.status(200).json({
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
        usertoken: token
      
      });
  
  
  }
  
 else  if(lbs){
  
  
  
  const labtp = {
          message: `Welcome Labtech ${user.fname} ${user.lname}`,
          labtech:{
              userId: user.id,
              labtId: lbs.id,
              name: user.fname + ' ' + user.lname,
              verified: user.is_verified,
              license_no: lbs.license_no,
              speciality: lbs?.speciality || 'None',
              years_experience: lbs.years_experience,
              facility: `${fac?.fac_name || 'Unknown'}  (${fac?.fac_type || ' also Unknown '})`,
              submitted: lbs.created_at
          }
      };
  
      const labt = 'Bearer ' + gentok(labtp);
  
  
      return res.status(200).json({labtp, labtech_token: labt});
  
  }
  
  
  }
  
  
  




//get facilities ako ndani
else {
const token = 'Bearer ' + gentok(user.id, user.email || user.phone);

if(!user.is_verified){

  const token = 'Bearer ' + gentok(user.id,user.email || user.phone);
  
  const otp = await genotp(user.id);
  await sendotpmail(user.email,otp);
  return res.status(401).json({
  Message: "please verify user first",
  verfificationToken: token
  });
  }







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
  usertoken: token

});
};

  }
  catch(err){

    res.status(500).json({error: 'Failed to login user. Try again later'});
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

    //if(!(decem)&& !(decem === user.email) || !(decop) && !(decop === user.phone)) return res.status(401).json({error: 'Unathorized action was detected'}); 
      if(!decid || !decem)  return res.status(401).json({error: 'Tokeno  es envalido  muchacho'});


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



};




//user/forgotpass


export const forgotpass = async (req,res) =>{


try{
  if(!req.body) return res.status(400).json({error: 'Missing reques body'});

  const {email,phone} = req.body;
  if(!email && !phone) return res.status(401).json({error: 'Missing email or phone'});

  const user = await User.findOne({where: {...(email && {email}), ...(phone && {phone})}});
  if(!user) return res.status(404).json({error: 'No user with such details..'});

  const verified = user.is_verified; //stored as boolean in db 

  if(!verified) return res.status(401).json({error: 'Email was not verified yet'});

  

  const userid = user.id;
  const otp = await  genotp(userid);

  //later will add send otp with nodemaila and also whatsappwebjs
  await sendotpmail(user.email,otp);


  console.log(otp); //get rid of this in production


  const token ='Bearer ' + gentok(userid,user.email,user.phone);

  res.status(202).json({
    message: `Otp send to ${user.phone || 'phone'}  via whatsapp and ${user.email || 'email'}`,
    token
  });

  //later frontend should redirect on reset password where the token would be required as a header


}

catch(err){

  console.log(err.message);

  res.status(500).json({error: 'Something went wrong'});



}


};


//reset pass now - token used here is from forgot pass

export const resetpass = async (req,res) =>{

  try{

    if(!req.body) return res.status(400).json({error: 'Missing request body'});

    const ah = req.headers['authorization'];
    const {otp,newpassword} = req.body;





    if(!ah) return res.status(401).json({error: 'Missing token'});
    if(!(ah.startsWith('Bearer '))) return res.status(401).json({error: 'Invalid token format'});
    if(!otp) return res.status(401).json({error: 'Missing otp'});

    const token = ah.split(" ")[1];

    //verify iyo token

    const decoded = vertok(token);
    const id = decoded.id;
    const email = decoded.email;
    const phone = decoded.phone;



    if(!decoded || !decoded.id || !email ) return res.status(401).json({error: 'Invalid or expired token'});

    


    //verify otp
    const checkot = await verotp(id,otp.toString());
    console.log(`entered otp ${otp}`);
    if(checkot !== otp) return res.status(401).json({error: 'Invalid or expired otp'});

    const hashpass = await bcrypt.hash(newpassword,10);




    
    if (email) {
      await User.update({ password_hash: hashpass }, { where: { email } });

      const user = await  User.findOne({where:{email}});

      const usname = capfast(user.fname);



      const template = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Changed</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      padding: 20px;
      color: #333;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 20px;
      max-width: 600px;
      margin: auto;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    h2 {
      color: #2c3e50;
    }
    .message {
      margin-top: 10px;
      font-size: 1.1em;
    }
    .footer {
      margin-top: 20px;
      font-size: 0.9em;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>🔐 Password Changed Successfully</h2>
    <p class="message">
      Hello,<br><br>
      Dear <strong>${usname}</strong><br>
      Your Afyalink account password has been updated successfully.<br>
      You can now log in with your new password.<br>
       If you did not initiate this change, please contact our support team immediately.
      
    </p>

    <div class="footer">
      <i>This is an automated message. Please do not reply directly to this email.</i>
    </div>
  </div>
</body>
</html>
`;
    

        await respasmail(email,template);
      
    } else if (phone) {
      await User.update({ password_hash: hashpass }, { where: { phone } });
    } else {
      return res.status(400).json({ error: 'Missing email or phone in token' });
    }

    
    
 

    res.status(201).json({success: 'Password changed succesfully'});



  }
  catch(err)
  {

    console.log(err.message);
    res.status(500).json({error: 'Could not change password'});

  }



};



//admin created at system init....

//activate or inactivate facility
//create admin fromhere..
//check if fac already got an admin..
//if facility not intialized 
//facility got no users
//web scoets for chats ..God damn



export const sysinit = async (req,res) =>{

try{













}

catch(ii)
{
  console.log(ii.message);
  return res.status(501).json({error:'Could not intialize system'});
}



};

//man i dont feel like doing this shii...

export const prous = async(req,res) =>{

  try{
    if(!req.file) return res.status(422).json({error: 'Please select a photo file'});
    const prof = req.file;
    const ah = req.headers['authprization'];
    if(!ah) return res.status(401).json({error:'Missing auth token'});
    if(!ah.startsWith('Bearer ')) return res.status(422).json({error:'Invalid token format'});
    const token = ah.split(' ')[1];
    const decoded = vertok(token);
    if(!decoded) return res.status(401).json({error:'Invalid or expired token'});
    const dc = decoded?.id?.doctor;
    const sj = decoded?.id.surgeon;
    const ns = decoded?.id?.nurse;
    const lb = decoded?.id?.labtech;
    const rf = decoded?.id?.refmanager;
    const pt = decoded?.id?.patient;
    const ad = decoded?.id?.admin;


    if(dc)
    {
      const usid = dc.userId;
      const user = await User.findByPk(usid);
      if(!user) return res.status(404).json({error:'User not found'});
      const docid = dc.docid;
      const doc = await Doctor.findByPk(docid);
      if(!doc) return res.status(404).json({error:'Doctor not yet registered on afyalink'});
      if(!user.is_verified) return res.status({error:'User is not verified'});

      user.photo = prof.buffer;
      user.mime = prof.mimetype;

      await user.save();

      return res.status(202).json({success: true, message: 'Photo uploaded succesfully'});
    

    }
    else if(sj)
    {

      const usid = sj.userId;
      const user = await User.findByPk(usid);
      if(!user) return res.status(404).json({error:'User not found'});
      const docid = sj.doctorId;
      const doc = await Doctor.findByPk(docid);
      if(!doc) return res.status(404).json({error:'Doctor not yet registered on afyalink'});
      if(!user.is_verified) return res.status({error:'User is not verified'});
      const lic = sj.lic_no;
      const cs = await Surgeon.findOne({where: {license_number: lic}});
      if(!cs) return res.status(404).json({Error:'Surgeon not submitted details yet'});

      user.photo = prof.buffer;
      user.mime = prof.mimetype;

      await user.save();

      return res.status(202).json({success: true, message: 'Photo uploaded succesfully'});
    


    }

    else if(ns){
      const usid = ns.id;
      const user = await User.findByPk(usid);
      if(!user) return res.status(404).json({error:'User not found'});
      const nt0 = ns.license_number;
      const nsa = await Nurse.findByPk({where:{license_number:nt0}});
      if(!nsa) return res.status(404).json({error:'Surgeon not yet registered on afyalink'});
      if(!user.is_verified) return res.status({error:'User is not verified'});

      user.photo = prof.buffer;
      user.mime = prof.mimetype;

      await user.save();

      return res.status(202).json({success: true, message: 'Photo uploaded succesfully'});
    

    }
    else if(lb)
    {
      const usid = lb.userId;
      const user = await User.findByPk(usid);
      if(!user) return res.status(404).json({error:'User not found'});
      const docid = lb.labtId;
      const doc = await Labtech.findByPk(docid);
      if(!doc) return res.status(404).json({error:'Labtech not yet registered on afyalink'});
      if(!user.is_verified) return res.status({error:'User is not verified'});

      user.photo = prof.buffer;
      user.mime = prof.mimetype;

      await user.save();

      return res.status(202).json({success: true, message: 'Photo uploaded succesfully'});
    

    }

    else if (rf)
    {
      const usid = rf.id;
      const user = await User.findByPk(usid);
      if(!user) return res.status(404).json({error:'User not found'});
      if(!user.is_verified) return res.status({error:'User is not verified'});

      user.photo = prof.buffer;
      user.mime = prof.mimetype;

      await user.save();

      return res.status(202).json({success: true, message: 'Photo uploaded succesfully'});
    

    }

    else if(pt)
    {
      const usid = pt.userId;
      const user = await User.findByPk(usid);
      if(!user) return res.status(404).json({error:'User not found'});
      const docid = pt.id;
      const doc = await Patient.findByPk(docid);
      if(!doc) return res.status(404).json({error:'Patient not yet registered on afyalink'});
      if(!user.is_verified) return res.status({error:'User is not verified'});

      user.photo = prof.buffer;
      user.mime = prof.mimetype;

      await user.save();

      return res.status(202).json({success: true, message: 'Photo uploaded succesfully'});
    


    }

    else if(ad){

    const usid = ad.id;
      const user = await User.findByPk(usid);
      if(!user) return res.status(404).json({error:'User not found'});
      if(!user.is_verified) return res.status({error:'User is not verified'});

      user.photo = prof.buffer;
      user.mime = prof.mimetype;

      await user.save();

      return res.status(202).json({success: true, message: 'Photo uploaded succesfully'});
    


    }

    else{
      return res.status(403).json({error:'An errror occured and yes you are responsible..not us'});
    }


  }
  catch(e)
  {
    console.log(e.message);
    return res.status(501).json({error:'Could not upload profile photo'});
  }
}



export const i0x567 = async (req,res)=>{

  try{
    const pl = req.params;
    if(isNaN(id)) return res.status(422).json({error:`Id must be of type int and not ${id}`});
    const ah = req.headers['authorization'];
    if(!ah) return res.status(401).json({error:'Missing auth header'});
    if(!ah.startsWith('Bearer ')) return res.status(422).json({error: 'Invalid token format'});
    const token = ah.split(' ')[1];
    const decoded = vertok(token);
    if(!decoded) return res.status(403).json({error:'Invalid or expired token..sire'});

    const dc = decoded?.id?.doctor;
    const sj = decoded?.id.surgeon;
    const ns = decoded?.id?.nurse;
    const lb = decoded?.id?.labtech;
    const rf = decoded?.id?.refmanager;
    const pt = decoded?.id?.patient;
    const ad = decoded?.id?.admin;

    if(dc)
    {
      const usid = dc.userId;
      if(parseInt(pl) !== parseInt(usid)) return res.status(401).json({error:`${pl} is not equal to ${usid}`});
      const user = await User.findByPk(usid);
      if(!user) return res.status(404).json({error:'User not found'});
      const docid = dc.docid;
      const doc = await Doctor.findByPk(docid);
      if(!doc) return res.status(404).json({error:'Doctor not yet registered on afyalink'});
      if(!user.is_verified) return res.status({error:'User is not verified'});
      if(!user.photo) return res.status(404).json({error:`${user.user_role} ${user.fname} ${user.lname} has not uploaded a photo yet`});
      const df = "<img src={user.photo}>";
      const p2 = user.photo.toString('base64');
      const p0 = `data:${user.mime};base64,${p2}`;
      return res.status(200).json({
        display_frontend: df,
        user:{
          id: usid,
          photo:p0
        }
      });

    }

    else if(sj)
{
  const usid = sj.userId;
  if(parseInt(pl) !== parseInt(usid)) return res.status(401).json({error:`${pl} is not equal to ${usid}`});

      const user = await User.findByPk(usid);
      if(!user) return res.status(404).json({error:'User not found'});
      const docid = sj.doctorId;
      const doc = await Doctor.findByPk(docid);
      if(!doc) return res.status(404).json({error:'Doctor not yet registered on afyalink'});
      if(!user.is_verified) return res.status({error:'User is not verified'});
      const lic = sj.lic_no;
      const cs = await Surgeon.findOne({where: {license_number: lic}});
      if(!cs) return res.status(404).json({Error:'Surgeon not submitted details yet'});
      if(!user.photo) return res.status(404).json({error:`${user.user_role} ${user.fname} ${user.lname} has not uploaded a photo yet`});
      const df = "<img src={user.photo}>";

      const p2 = user.photo.toString('base64');
      const p0 = `data:${user.mime};base64,${p2}`;
      return res.status(200).json({
        display_frontend: df,
        user:{
          id: usid,
          photo:p0
        }
      });

}
else if(ns)
{
  const usid = ns.id;
  if(parseInt(pl) !== parseInt(usid)) return res.status(401).json({error:`${pl} is not equal to ${usid}`});

  const user = await User.findByPk(usid);
  if(!user) return res.status(404).json({error:'User not found'});
  const nt0 = ns.license_number;
  const nsa = await Nurse.findByPk({where:{license_number:nt0}});
  if(!nsa) return res.status(404).json({error:'Surgeon not yet registered on afyalink'});
  if(!user.is_verified) return res.status({error:'User is not verified'});
  if(!user.photo) return res.status(404).json({error:`${user.user_role} ${user.fname} ${user.lname} has not uploaded a photo yet`});
  const df = "<img src={user.photo}>";
  const p2 = user.photo.toString('base64');
  const p0 = `data:${user.mime};base64,${p2}`;
  return res.status(200).json({
    display_frontend: df,
    user:{
      id: usid,
      photo:p0
    }
  });

   


}
else if(lb)
{

  const usid = lb.userId;
  if(parseInt(pl) !== parseInt(usid)) return res.status(401).json({error:`${pl} is not equal to ${usid}`});

      const user = await User.findByPk(usid);
      if(!user) return res.status(404).json({error:'User not found'});
      const docid = lb.labtId;
      const doc = await Labtech.findByPk(docid);
      if(!doc) return res.status(404).json({error:'Labtech not yet registered on afyalink'});
      if(!user.is_verified) return res.status({error:'User is not verified'});
      if(!user.photo) return res.status(404).json({error:`${user.user_role} ${user.fname} ${user.lname} has not uploaded a photo yet`});
      const df = "<img src={user.photo}>";
      const p2 = user.photo.toString('base64');
      const p0 = `data:${user.mime};base64,${p2}`;
      return res.status(200).json({
        display_frontend: df,
        user:{
          id: usid,
          photo:p0
        }
      });



}
else if (rf)
{

  const usid = rf.id;
  if(parseInt(pl) !== parseInt(usid)) return res.status(401).json({error:`${pl} is not equal to ${usid}`});

  const user = await User.findByPk(usid);
  if(!user) return res.status(404).json({error:'User not found'});
  if(!user.is_verified) return res.status({error:'User is not verified'});
  if(!user.photo) return res.status(404).json({error:`${user.user_role} ${user.fname} ${user.lname} has not uploaded a photo yet`});
  const df = "<img src={user.photo}>";
  const p2 = user.photo.toString('base64');
  const p0 = `data:${user.mime};base64,${p2}`;
  return res.status(200).json({
    display_frontend: df,
    user:{
      id: usid,
      photo:p0
    }
  });


}

else if(pt)
{
  const usid = pt.userId;
  if(parseInt(pl) !== parseInt(usid)) return res.status(401).json({error:`${pl} is not equal to ${usid}`});

  const user = await User.findByPk(usid);
  if(!user) return res.status(404).json({error:'User not found'});
  const docid = pt.id;
  const doc = await Patient.findByPk(docid);
  if(!doc) return res.status(404).json({error:'Patient not yet registered on afyalink'});
  if(!user.is_verified) return res.status({error:'User is not verified'});
  if(!user.photo) return res.status(404).json({error:`${user.user_role} ${user.fname} ${user.lname} has not uploaded a photo yet`});
  const df = "<img src={user.photo}>";
  const p2 = user.photo.toString('base64');
  const p0 = `data:${user.mime};base64,${p2}`;
  return res.status(200).json({
    display_frontend: df,
    user:{
      id: usid,
      photo:p0
    }
  });



}
else if(ad)
{
  const usid = ad.id;
  if(parseInt(pl) !== parseInt(usid)) return res.status(401).json({error:`${pl} is not equal to ${usid}`});

  const user = await User.findByPk(usid);
  if(!user) return res.status(404).json({error:'User not found'});
  if(!user.is_verified) return res.status({error:'User is not verified'});
  if(!user.photo) return res.status(404).json({error:`${user.user_role} ${user.fname} ${user.lname} has not uploaded a photo yet`});
  const df = "<img src={user.photo}>";
  const p2 = user.photo.toString('base64');
  const p0 = `data:${user.mime};base64,${p2}`;
  return res.status(200).json({
    display_frontend: df,
    user:{
      id: usid,
      photo:p0
    }
  });




}

else{
  //kuma ww
  return res.status(422).json({error:'Nothing can e done to fetch the phot at the moment.. sorry'});
}




  }

  catch(frumbanya)
  {
    console.log(frumbanya.message);
    return res.status(501).json({error:'Could not fetch user photo'});

  }



}

  














