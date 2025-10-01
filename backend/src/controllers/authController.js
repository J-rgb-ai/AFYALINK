/*

chill imma try out smth 

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db/admin");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role || "provider"]
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = users[0];

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}; */


//db queries commented coz my editor is crazy just nothing wrong with em...just doesnt really colorize the code and I hate that

const bc = require('bcrypt');
const redis = require('../config/redis/redis');
const rolecheck = require('../controllers/rolectrl/rolecheck');
const {genjwt,verjwt} = require('../controllers/auth/jwt');
const {genotp,verotp} = require('../controllers/auth/otp');
const dba = require('../config/db/admin');
const docdb = require('../config/db/doctor');
const nursedb = require('../config/db/nurse');
const secdb = require('../config/db/secretary');
const labdb = require('../config/db/labtech');
const surgdb = require('../config/db/surgeon');
const refdb = require('../config/db/refferman');
const accdb = require('../config/db/accountcler_db');
const fs = require('fs');
const multer = require('multer');
const filetype = require('file-type');



//filter pic ita uploadiwa

const photofilter = (req,file,cb) {
  const allowed = ['image/jpeg','image/png','image/webp'];

  if(allowed.includes(file.mimetype)){
    cb(null,true);

  } else {
    cb(new Error('Only Images allowed'),false);
  }


};


//double check jst incase

const ismage = async(buffer) =>{
  const type = await filetype.fileTypeFromBuffer(buffer);
  return type?.mime.startsWith('image');
};






const upload => multer({
  storage: multer.memoryStorage(),
  photofilter,
  limits: {fileSize: 15 * 1024 * 1024}
});





// /users/register

exports.registerUser = async(req,res) =>{

  const{fname,lname,email,phone,password,gender,dob} = req.body;
  const photobuff = req.file?.buffer;


  try{
    if(!fname || !lname || !email || !phone || !password || !gender || !dob) return res.status(400).json({error: 'Missing required fields'});

    if(!ismage(photobuff)) return res.status(400).json({error:'Please upload a valid image file'});

    //check if user exists

    const [existing] = await dba.query(/*"SELECT id FROM users WHERE email = ? OR phone = ?",[email,phone]*/);


      if (existing.length > 0) return res.redirect(307,'users/login');
    const password_hash = bc.hash(password,10);

    await dba.query(/*"INSERT INTO users(fname,lname,email,phone,password_hash,gender,dob) VALUES(?,?,?,?,?,?,?)",[fname,lname,email,phone,password_hash,gender,dob]*/);

// create user and wait for otp then update is verified to true..then add verified when on logs table..mee nmeenda
const otp = genotp();
await redis.set(`otp:${phone}`,otp,{EX:300});
await redis.set(`otp:${email}`, otp,{EX:300});

//TODO sent otp via emal but for now lets console.log

const otptoken = genjwt({phone,email},'7m');

res.status(201).json({message:'user registerd otp sent to phone and email', token: otptoken });





//console.log(otp);
//console.log(otptoken);




  }
  catch(err)
  {

    res.status(500).json({error: 'Registration failed'});



  }





//



};

// /users/register/verify

exports.verifyUser = async(req,res) =>{
  try{
  const ah = req.headers.authorization;
  if(!ah?.startsWith('Bearer ')) return res.status(401).json({error:'Missing or invalid token'});

  const token = ah.split('')[1];

  const decoded = verjwt(token);

  if(!decoded || !decoded.email || !decoded.phone) return res.status(401).json({error: 'Invalid or expired token'});

  req.user = decoded;

  const phone = req.user.phone;
  const email = req.user.email;

  const {otp:inputotp} = req.body

  if(!otp) return res.status(401).json({error:'Missing otp'});

  const  actualotp = await redis.get(`${phone}`) || redis.get(`${email}`);

  if(!actualotp) return res.status(401).json({error:'otp already expired'});

  if((actualotp != inputotp) || (!verotp(inputotp,actualotp))) return res.status(401).json({error:'invalid otp'});

  if(verotp(inputotp,actualotp)){
    const verified = true;
    await dba.query(/*'UPDATE  users SET is_verified =? WHERE email = ? OR phone = ?',[verified,email,phone]*/);
    await redis.del(`otp:${email}`);
    await redis.del(`otp:${phone}`);
    //res.setHeader('Authorization',`Bearer ${token}`);
    return res.redirect(307,'/users/login')

  }


  }

  catch(err)
  {

    console.error(err);
    res.status(500).json({error: 'otp verifcation failed'});

  }



};

// /users/login

exports.userLogin = async (req,res) =>{

  try{

  const {phone,email,password} = req.body;

  const [verows] = await dba.query(/*'SELECT id FROM users WHERE  is_verified = ? AND email = ? OR phone = ?'[FALSE,email,phone]*/);

  if(verows.length != 0) {
    try{

      //go back to users/register/verify

      const otp = genotp();
      await redis.set(`otp:${phone}`,otp,{EX:300});
      await redis.set(`otp:${email}`,otp,{EX:300});

      //will send to email..TODO

      const otptokenr = genjwt({phone,email},'5m');
      res.setHeader(`Authorization`,`Bearer ${otptokenr}`);
      res.redirect(307,'/users/register/verify');
      console.log()

    

    
    }
    catch(err){

      res.status(500).json({error:'Could not redirect unregistered user to verify'});

    }

  }

  const [rows] = await dba.query(/*'SELECT * FROM users WHERE email =? OR phone = ? AND is_verfied = ?',[TRUE,email,phone]*/);
    const user = rows[0];

    if(rows.length === 0){
      return res.status(301).json({error:'user not found'});
    }
 const match = await bc.compare(password,user.password_hash);
 if(!match) return res.status(301).json({error:'invalid credentials'});


    const otp = genotp();
    await redis.set(`otp:${phone}`,otp,{EX:300});
    await redis.set(`otp:${email}`,otp,{EX:300});

    const logotptoken = genjwt({phone,email},'5m');

    res.setHeader('Authorization',`Bearer ${logotptoken}`);
    res.redirect(307,'/users/login/verify');


  }

  catch(err)
  {
    console.error(err);
    res.status(500).json({error:'Could not login'});
  }


};

// /users/login/verify

exports.loginVerify = async (req,res) =>{

  const ah = req.headers['authorization'];
  if(!ah?.startsWith('Bearer ')) return res.status(500).json(erroe:'Missing or invalid token');

  const token = ah.split('')[1];
  const decoded = verjwt(token);

  if(!decoded || !decoded.email || !decoded.phone) return res.status(301).json({error:'Invalid or expired token'});

  req.user = decoded;


    const { otp: inputOtp } = req.body;
    const { phone, email } = req.user;

    if(!otp) return res.status(301).json({error: 'missing otp'});
  
    const storedOtp = await redis.get(`otp:${phone}`) || await redis.get(`otp:${email}`);
    if (!storedOtp || inputOtp !== storedOtp) {
      return res.status(401).json({ error: 'Invalid or expired OTP' });
    }

    if(verotp(inputOtp,storedOtp))
    {

    await redis.del(`otp:${phone}`);
    await redis.del(`otp:${email}`);
    
    const [rows] = await db.query(/*
      'SELECT id, role FROM users WHERE phone = ? OR email = ?',
      [phone, email]*/
    );
  
    const user = rows[0];
    const fullToken = genjwt({ id: user.id, role: user.role, phone, email });
  
    res.setHeader('Authorization',`Bearer ${fullToken}`);
    res.json({ message: 'Login successful', token: fullToken });
    // Or redirect to /users/home if frontend handles it maybe later am tired rn
  }
  

};




