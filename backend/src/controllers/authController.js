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
import User from '../config/db/orm/ormmodels/user.js';
import gentok from '../utils/jwt/genjwt.js';
import Facility from '../config/db/orm/ormmodels/facility.js';
import Doctor from '../config/db/orm/ormmodels/doctors.js';
import vertok from '../utils/jwt/verjwt.js';
import genotp from '../utils/otp/genotp.js';
import verotp from '../utils/otp/verotp.js';
import { Fn } from 'sequelize/lib/utils';
import { sendotpmail,sendregmail,respasmail } from '../utils/mail/mailer.js';
import redis from '../config/redis/redis.js';
import Patient from '../config/db/orm/ormmodels/patients.js';
import userrouter from '../routes/authRoutes.js';
import Nurse from '../config/db/orm/ormmodels/nurse.js';
import Surgeon from '../config/db/orm/ormmodels/surgeon.js';
import Labtech from '../config/db/orm/ormmodels/labtechs.js';
import { format } from 'morgan';




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


if(!user) return res.status(404).json({error: 'User with those details not found'});
const passhash = user.password_hash;

const verify_user = await bcrypt.compare(password,passhash);

if(!verify_user) return res.status(401).json({error: 'Invalid details..'});

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
else if(user.role === 'labtech' && user.is_verified)
{
//do labtech shii over here 

const lid = user.id;
const lbs = await Labtech.findOne({where:{user_id:lid}});
if(!lbs){

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

if(lbs){



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
  














