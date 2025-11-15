
import jsonwebtoken from 'jsonwebtoken';
import vertok from '../utils/jwt/verjwt.js';
import models from '../config/db/orm/sequalize.js'
import { genmail } from '../utils/mail/mailer.js';
import { Op, where } from 'sequelize';



const{User,Doctor,Facility,Referral,ReferralNote,Department,Payment,Patient,Blocked,BlockchainLog,Surgeon,LabResult,Visit,Staff} = models;










export const adminauth = async (req,res) =>{

    //mtu akilog in kama admin inatuma otp na anapewa token ....saa alafu io otp anakuja 
    //kuiweka apa kwa admin/auth afuu apewe token.. ndo atakua anatumia uko kwa admin dashboard na token yake ina signiwa na kila kitu
    
    
    
    try{
    if(!req.body) return res.status(401).json({error: 'Missing request body'});
    const ah = req.headers['authorization'];
    const {otp} = req.body;

    if(!ah) return res.status(401).json({error: 'Missing authorization header'});
    if(!ah.startsWith('Bearer ')) return res.status(401).json({error: 'Invalid token format'});
    if(!otp) return res.status(401).json({error: 'Missing otp'});

    const token = ah.split(" ")[1];
    const decoded = vertok(token);
    const  adm = decoded?.id?.admin;
    console.log(adm);
    if(!decoded || !adm|| !adm.verified || !adm.email || !(adm.role === 'admin' || adm.role === 'iadmin')) return res.status(401).json({error:'Something fishy..did you smuggle this token?'});
    const storedo = await verotp(adm.id);

    if(otp !== storedo) return res.status(401).json({error: 'Invalid or expired otp'});

    
    const email = adm.email;
    const user = await User.findOne({where: {email}});
    if(!user) return res.status.json({error: 'admin not found'});
    if(!(user.user_role === 'admin' || user.user_role === 'iadmin') || !user.is_verified) return res.status(401).json({error: 'You are not  an elgible admin'});
    const facid = user.facility_id;
    const fac = await Facility.findByPk(facid);
    const facname = fac?.fac_name || 'Unknown';
    const factype = fac?.fac_type || 'Unknown';

    const adminpay = { message: `Welcome admin ${user.fname} Your login has been verified `,
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
                        hauth: true,
                        joined: user.created_at
                    }};

        const admintok = 'Bearer ' + gentok(adminpay);


        res.status(200).json({
            adminpay,
            admintoken: admintok
        });



        //TDO send admin email that he logged in and also send to main admin that iadmin logged in
    }


    catch(err)
    {

        console.log(err.message);
        res.status(500).json({error: 'Could not authenticate admin for login'});


    }


} ;


//admin/dashboard now with token from admin/auth
//kutakua na query, nn ingine... selected table... pia like italist table zote apo ndo tjue vle tado..

export const admindash = async (req,res) =>{

    try{
    //used later for searching across various things

    //pia kutakua na actions kaa delete user and shiii
    if(req.query){
        const search = req.query;
    }

    const ah = req.headers['authorization'];
    if(!ah) return res.status(401).json({error: 'Missing authorization header'});
    if(!ah.startsWith('Bearer ')) return res.status(401).json({error: 'Invalid token format.'});

    const token = ah.split(" ")[1];

    const decoded = vertok(token);
    const adm = decoded?.id?.admin;
    console.log(adm);

    if(!decoded) return res.status(401).json({error:'This token is invalid bro'});
    if(!adm.hauth ||!(adm.role === 'admin' ||  adm.role ==='iadmin') || !adm.verified) return res.status(401).json({error: 'Seems like a smuggled token to me'});

    const id = adm.id;
    const user = await User.findByPk(id);
    if(!user) return res.status(401).json({error: 'Admin not found'});
    const adr = user.user_role;
    if(!(user.user_role === 'admin' || user.user_role === 'iadmin') || !user.is_verified) return res.status(403).json({error:'You are not priviledged enough to view the dashboard'});
    const facid = user.facility_id;
    const fac = await Facility.findByPk(facid);
    const facname = fac?.fac_name || "unknown";
    const factype = fac?.fac_type || "Unknown";


    //payloads

    //admin
    //this will be the basis for selecting users for adding deleting make iadmins etc..

    const adminpay =  { message: `Welcome to  admin dashboard Admin:  ${user.fname}`,
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
        hauth: true,
        joined: user.created_at
    }};


    

    //prolly  think of how my life went crumbling down  while doing this
    /**
     * facilites
     * users
     * staff
     * patietnts
     * doctors
     * surgeons
     * departments
     * nurses
     * labtechs
     * referrals
     * referral_notes
     * blockchain log
     *visits
     labresults
     payments

     * 
     * 
     */


     //kwanza apa paging inafaa ku happen for scalabiity

     //fix circular imports
    
     const allfac = await  Facility.findAll();
     const allus = await User.findAll({attributes:{exclude:['password_hash']},where:{facility_id: facid}});
     const allstaff = await Staff.findAll();
     const allpat = await Patient.findAll({include:[{ model: User, as: 'user', where:{facility_id:facid},exclude:['password_hash']}]});
     const alldoc = await Doctor.findAll({include:[{model: User, as: ''}]});
     const allsug = await Surgeon.findAll();
     const allnus = await Nurse.findAll();
     const altech = await Labtech.findAll();
     const allref = await Referral.findAll();
     const allrefn = await ReferralNote.findAll();
     const allb = await BlockchainLog.findAll();
     const allvist = await Visit.findAll();
     const labres = await LabResult.findAll();
    const  allpay = await Payment.findAll();
    const alldep = await Department.findAll();
    const allbl = await Blocked.findAll();


//fetch from users where is refmanager or admin
const refrole = 'refmanager';
const unapman = 'refmanagertobe';
const admirole = 'admin';
const subadm = 'iadmin'

const getref = await User.findAll({where:{user_role:refrole}, attributes:{exclude:['password_hash']}});
const getad = await User.findAll({where:{user_role:admirole},attributes:{exclude:['password_hash']}});
const getsu = await User.findAll({where:{user_role: subadm},attributes:{exclude:['password_hash']}});
const gett = await  User.findAll({where:{user_role:unapman}},{attributes:{exclude:['password_hash']}});

console.log(allus);

    res.status(200).json({
        adminpay,
        tables: {
            Facilities: allfac,
            Departments: alldep,
            Users: allus,
            Staff: allstaff,
            Patients: allpat,
            Doctors: alldoc,
            Surgeons: allsug,
            Nurses:  allnus,
            Labtechs: altech,
            Referrals: allref,
            RefferalNotes: allrefn,
            Visits: allvist,
            Labresults: labres,
            Payments: allpay,
            BlockchainLogs: allb,
            mutiny: allbl
         },
         Main:{
            RefManagers: {
              approved: getref,
              awaiting: gett
            },
            MainAdmin: getad,
            Admins: getsu

         }
    });

}



catch(err){

        console.log(err.message);
        res.status(500).json({error: 'Failed to  fetch data'});
}







};



//admin/logs token from adminauth  
/* use table audit_logs*/


export const adminlog = async(req,res) =>{

    try{


        //if there s a search query..imma head to that in a few....
        if(req.query) {
            const search = req.query;
        }

        const ah = req.headers['authorization'];
        if(!ah) return res.status(401).json({error: 'Missing auth header'});
        if(!ah.startsWith('Bearer ')) return res.status(401).json({error: 'Invalid token format'});

        const token = ah.split(" ")[1];

        const decoded = vertok(token);
        if(!decoded) return res.status(401).json({error: 'Invalid or expired token'});

        const adm = decoded?.id?.admin;
        if(!adm || !adm.hauth || !( adm.role === 'admin' || adm.role ===  'iadmin')) return res.status(401).json({error: 'You are not an admin'});

        const id = adm.id;

        const user = await User.findByPk(id);
        if(!user) return res.status(404).json({error: 'Admin not found'});
        const adr = user.user_role;
        if(!(adr === 'admin' || adr === 'iadmin')) return res.status(403).json({error:'You are not priviledged to view logs'});
        const facid = user.facility_id;
        const fac = await Facility.findByPk(facid);
        const facname = fac?.fac_name || "unknown";
        const factype = fac?.fac_type || "Unknown";
        const logs = await AuditLog.findAll();
         console.log(logs);

        const adminpay =  { message: `Welcome to  admin Logs  Admin:  ${user.fname}`,
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
            hauth: true,
            joined: user.created_at
        }};


        res.status(200).json({
            adminpay,
            logs
        });




        //narudi acha nfike soko 
//ndo kutoke wikendi..wtf is this..who wrote this code...nashangaa hizi ni ma what nlikua naandikaaa






    }
    catch(err)
    {

        console.log(err.message);
        res.status(500).json({error: 'Failed to fetch database logs'});





    }



}


//admin/create

/**
 * only admin and iadmin can create iadmins from existing verified users
 * users with therole of assign to be admins
 * Only admin can delete  admins but iadmin cant delete admins or iadmins
 * admin cant delete himself but iadmin can delete himself
 * use auth token from admin/auth 
 * when iadmin is deleted he just becomes a regular user or just delete permanently depending on req.body delt = 'yes || 'no'
 * admin to be made is a  selected user from admins dashboard and parse id to setid or delid depending on make admin or crreate admin
 */

export const createadmin = async (req,res) =>{

    try{

        if(!req.body) return res.status(401).json({error: 'Missing request body', format: '{"setid": "2"}'});
        const {setid} = req.body;
        const ah = req.headers['authorization'];
        if(!ah) return res.status(401).json({error: 'Missing auhorization header'});
        if(!ah.startsWith('Bearer ')) return res.status(401).json({error:'Invalid token format'});
        if(!setid) return res.status(401).json({error: 'specify user id in setid field', format: '{"setid": "2"}'});
        const token = ah.split(" ")[1];
        const decoded = vertok(token);
        if(!decoded) return res.status(401).json({error: 'Invalid token'});
        const adm = decoded?.id?.admin;
        if(!adm || !adm.hauth || !(adm.user_role === 'admin' || 'iadmin')) return res.status(401).json({error: 'This token likely been smuggled'});
        const adminid = adm.id;
        const getad = await User.findByPk(adminid);
        if(!getad) return res.status(401).json({error: 'No such admin'});
        const fc = getad.facility_id;
        const veladm = await User.findAll({where:{facility_id: fc, user_role:{[Op.or]:['admin','iadmin']}}});
        if(!veladm) return res.status(403).json({error:'Facility has no admins please intialize system at facility first'});
        if(veladm.length >= 2) return res.status(403).json({error:'System already has enough admins at your facility'});
        const crtb = `${getad.fname} ${getad.lname}`;
        const user = await User.findByPk(setid);
        if(!user) return res.status(404).json({error:'The requested user does not exist'});
        if(!user.is_verified) return res.status(401).json({error:'Unverified user cannot be admin please verify email first'});
        if(getad.facility_id !== user.facility_id) return res.status(403).json({warn: 'Can only create admins in your facility'});
        const pr = 'assign';
        if(user.user_role  === 'iadmin' || user.user_role === 'admin' ) return res.status(201).json({error:'User already is an admin'});
        if(user.user_role !== pr) return res.status(401).json({error:'User not eligible for iadmin status'});
        const email = user.email;
        const asr = 'iadmin';
        await User.update({user_role: asr},{where: {email}});

        const upad = await User.findOne({where:{email}});


        const facid = upad.facility_id;
        const fac = await Facility.findByPk(facid);
        const facname = fac?.fac_name || 'Unknown';
        const factype = fac?.fac_type || 'Unknown';
    
        const adminpay = { message: `Congratulations  ${upad.fname} is now an Admin`,
                        admin:{
                            id: user.id,
                            fname: upad.fname,
                            lname: upad.lname,
                            email: upad.email,
                            role: upad.user_role,
                            age: upad.age,
                            verified: upad.is_verified,
                            facility: facname,
                            facility_type: factype,
                            hauth: false,
                            created_by: crtb,
                            joined: upad.created_at,
                            admin_since: upad.updated_at
                        }};


const subject = "Admin Promotion";                     

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
    <h2>Congratulations. You are now an Admin</h2>
    <p class="value"><span class="label">Name:</span> ${upad.fname} ${upad.lname}</p>
    <p class="value"><span class="label">Email:</span> ${upad.email}</p>
    <p class="value"><span class="label">Role:</span> ${upad.user_role}</p>
    <p class="value"><span class="label">Age:</span> ${upad.age}</p>
    <p class="value"><span class="label">Verified:</span> ${upad.is_verified} </p>
    <p class="value"><span class="label">Facility:</span> ${facname}</p>
    <p class="value"><span class="label">Facility Type:</span> ${factype} </p>
    <p class="value"><span class="label">Joined:</span> ${upad.created_at}</p>
    <p class="value"><span class="label">Creater By:</span> ${crtb}</p>
    <p class="value"><span class="label">Admin since:</span> ${upad.updated_at}</p>

    <div class="footer">
      <i>This is an automated message. Please do not reply directly to this email.</i>
    </div>
  </div>
</body>
</html>`;


await genmail(upad.email,subject,template);

                        res.status(201).json({
                            adminpay,

                        });
    
        
}

    catch(err)
    {

        console.log(err.message);
        res.status(500).json({error: 'Could not create admin'});
    }




};



//admin/delete
//token from /admin/auth



export const deladmin = async (req,res) =>{


try{

    if(!req.body) return res.status(400).json({error: 'Missing request body', format: '{delid: "2", delt: "yes/no"}'});

    const{delid,delt} = req.body; //use yes or no kwa delt coz bool inaleta shida
    const ah = req.headers['authorization'];
    if(!ah) return res.status(401).json({error: 'Missing auth body'});
    if(!ah.startsWith('Bearer ')) return res.status(401).json({error:'Invalid token format'});
    if(!delid || !delt ) return res.status(422).json({error: 'Missing admin id ',format: '{delid: "2", delt: "yes/no"}'});
    const ch = await User.findByPk(delid);
    //console.log(ch);
    if(!ch) return res.status(404).json({error: 'User not found'});
    //console.log(ch);
    if(ch.user_role === 'admin') return res.status(401).json({error: 'You will be reported for doing this..and we might also disable your account in the process..'}); //disable user account..ama acha tu..coz hasira ni ya nn

    const token = ah.split(" ")[1];

    const decoded = vertok(token);

    if(!decoded) return res.status(403).json({error: 'Invalid  or expired token'});
    const adm = decoded?.id?.admin;
    if(!adm || !adm.hauth) return res.status(401).json({error: 'This token likely been smuggled'});
    const adi = adm.id;
    const vl = await User.findByPk(adi);
    if(!adi || !(adi.user_role === 'admin' || adi.user_role === 'iadmin')) return res.status(404).json({error: 'Admin not found'});
    if(adi.facility_id !== ch.facility_id) return res.status(403).json({warn: 'Please only work with individuals in your facility'});
    if(!vl) return res.status(403).json({error:'You are not a registered user'});
    if(vl.disabled) return res.status(403).json({error: 'Disabled accounts cannot perform this action'});
    if(vl,facility_id !== ch,facility_id) return res.status(403).json({error: 'Can only edit changes of users in your facility'});


    //admin deleting iadmins
    if(adm.role === 'admin'){
      if(!delt) return res.status(401).json({error: 'Please specify the delt option'});

      //confirm if that mf exists in db first.
      const adminid = adm.id;
      const valad = await User.findByPk(adminid);
      if(!valad) return res.status(401).json({error: 'Admin does not exist.'});
      const demoter = `${valad.fname} ${valad.lname}`;
      //console.log(adm.role);
      //console.log(valad.user_role);
      if(adm.role !== valad.user_role) return res.status(401).json({error: 'Unauthorized action detected'});
      if(valad.id === parseInt(delid)) return res.status(401).json({error: 'Action not permitted and will be reported'});
      const adtdl = await User.findByPk(delid);
      if(!adtdl) return res.status(404).json({error: 'Could delete admin beacuse he does not exist'});
      console.log(adtdl.user_role);
      if(adtdl.user_role !== 'iadmin') return res.status(401).json({error: 'Unathorized action detected'});
      const email = adtdl.email;

      if(delt === 'yes'){
        //delete admin permaently and notify by email

        const userdlt2 = await User.findOne({where:{email}});
        if(!userdlt2) return res.status(401).json({error:'Smth went wrong with the db'});

        const demoter11 = `${valad.fname} ${valad.lname}`; //wtf is this line doing and yet demoter  exists
        const facid = userdlt2.facility_id;
        const fac = await Facility.findByPk(facid);
        const facname = fac?.fac_name || 'Unknown';
        const factype = fac?.fac_type || 'Unknown';
        const delminpay2 = { message: `Congratulations  ${userdlt2.fname} has been deleted and so is no longer an Admin`,
        user_details2:{
            id: userdlt2.id,
            fname: userdlt2.fname,
            lname: userdlt2.lname,
            email: userdlt2.email,
            role: userdlt2.user_role,
            age: userdlt2.age,
            verified: userdlt2.is_verified,
            facility: facname,
            facility_type: factype,
            hauth: false,
            deleted_by: demoter11,
            joined: userdlt2.created_at,
            admin_since: userdlt2.updated_at
        }};



        await  User.destroy({where:{email}});
        res.status(201).json({
          delminpay2
        });


        const wn = `${userdlt2.fname} ${userdlt2.lname}`;





        //notify by email


      const dels = 'You are no longer an Afyalink admin';
      const template1 =`<html>
      <head>
        <titile> You are now a regular user</title>
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
        <div class='container'>
      <p>Dear ${wn};</p><br>
      <p>${demoter11} removed you from admin position </p><b>
        <div class="footer">
      <i>This is an automated message. Please do not reply directly to this email.</i>
    </div>
  </div>

      </body>

      </html>`;

      await genmail(email,dels,template1);


      }

     else  if(delt === 'no')
      {
        //only demote him from admin and back to assign and also notify via email

        const newr = 'assign';

        await User.update({user_role: newr},{where: {email} });

        //make payload for demotion

        const userdlt = await User.findOne({where:{email}});
        if(!userdlt) return res.status(401).json({error:'Smth went wrong with the db'});
        
        const facid = userdlt.facility_id;
        const fac = await Facility.findByPk(facid);
        const facname = fac?.fac_name || 'Unknown';
        const factype = fac?.fac_type || 'Unknown';
        const delminpay = { message: `Congratulations  ${userdlt.fname} is no longer  an Admin`,
        user_details:{
            id: userdlt.id,
            fname: userdlt.fname,
            lname: userdlt.lname,
            email: userdlt.email,
            role: userdlt.user_role,
            age: userdlt.age,
            verified: userdlt.is_verified,
            facility: facname,
            facility_type: factype,
            hauth: false,
            demoted_by: demoter,
            joined: userdlt.created_at,
            admin_since: userdlt.updated_at
        }};



        res.status(200).json({
          delminpay
        });
















        //send him not by email..

        const subj = 'Demotion from admin position';
        const template = `<html>
        <head>
          <title>Your admin priviledges have been revokead</title>
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
        <div class='container'>
      <p> Dear ${userdlt.fname};</P><br>
      <p>You have been demoted from admin to a regular user</p><br>
      <div class="footer">
      <i>This is an automated message. Please do not reply directly to this email.</i>
    </div>
  </div>
      </body>

        
        </html>`;


        await genmail(email,subj,template);










      }



    }




    //iadmin self deletion
    if(adm.role === 'iadmin') {

      const iadminid = adm.id;

      //check if iadmin exists
      const cheia = await User.findByPk(iadminid);
    //  console.log(cheia.id);
      //console.log(delid);
      if(!cheia) return res.status(404).json({error: 'No such admin'});

      if(cheia.user_role === 'assign') return res.status(200).json({error: 'user is not an admin'});
      if(cheia.user_role !== 'iadmin') return res.status(401).json({error:'Unauthorized action detected'});
      
      const email = cheia.email;
      if(cheia.id !== parseInt(delid)) return res.status(401).json({Alert: 'Nice try budy'});





      if(delt === 'yes')
      {
        //delete that mf 


        const userdlt3 = await User.findOne({where:{email}});
        if(!userdlt3) return res.status(401).json({error:'Smth went wrong with the db'});
        const demoter = `${userdlt3.fname} ${userdlt3.lname}`;


        const facid = userdlt3.facility_id;
        const fac = await Facility.findByPk(facid);
        const facname = fac?.fac_name || 'Unknown';
        const factype = fac?.fac_type || 'Unknown';
        const delminpay2 = { message: `Congratulations  ${userdlt3.fname} has been deleted and so is no longer an Admin`,
        user_details2:{
            id: userdlt3.id,
            fname: userdlt3.fname,
            lname: userdlt3.lname,
            email: userdlt3.email,
            prev_role: userdlt3.user_role,
            age: userdlt3.age,
            verified: userdlt3.is_verified,
            facility: facname,
            facility_type: factype,
            hauth: false,
            deleted_by: demoter,
            joined: userdlt3.created_at,
            admin_since: userdlt3.updated_at
        }};



        await  User.destroy({where:{email}});
        res.status(201).json({
          delminpay2
        });




        //notify with email

        const ds = 'You are No longer an Afyalink admin';
        const temp =`<html>
        <head>
          <title>You are no longer an afyalink admin</title>
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
        <p>Dear ${userdlt3.fname} ${userdlt3.lname} </p><br>
        <p>Due to some reasons you decided to leave admin position</p><br>

        <p>On afyalink</p><br>
        <div class="footer">
      <i>This is an automated message. Please do not reply directly to this email.</i>
    </div>
  </div>
      </body>
        </html>`;

        await genmail(email,ds,temp);


      }

      else if(delt === 'no')
      {

        //demote and not delete

        const neir = 'assign';

      

       await User.update({user_role: neir},{where:{email}});


       const userdlt1 = await User.findOne({where:{email}});

        if(!userdlt1) return res.status(401).json({error:'something went wrong'});
        const demoter1 = `${userdlt1.fname} ${userdlt1.lname}`;

       const facid = userdlt1.facility_id;
        const fac = await Facility.findByPk(facid);
        const facname = fac?.fac_name || 'Unknown';
        const factype = fac?.fac_type || 'Unknown';
        const delminpay1 = { message: `Congratulations  ${userdlt1.fname} is no longer  an Admin`,
        user_details:{
            id: userdlt1.id,
            fname: userdlt1.fname,
            lname: userdlt1.lname,
            email: userdlt1.email,
            role: userdlt1.user_role,
            age: userdlt1.age,
            verified: userdlt1.is_verified,
            facility: facname,
            facility_type: factype,
            hauth: false,
            demoted_by: demoter1,
            joined: userdlt1.created_at,
            admin_since: userdlt1.updated_at
        }};



        res.status(200).json({
          delminpay1
        })




















       //notify via email 

       const subto = 'Demotion from admin';
       const demt = `<html>
       <head>
        <title>You are no longer admin</title>
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
        <p>Dear ${userdlt1.fname} ${userdlt1.lname};</p><br>
        <p>Due to some reasons you have beem demoted from admin</p><br>
        <p>You are just a regular user now</p><br>
        <div class="footer">
      <i>This is an automated message. Please do not reply directly to this email.</i>
    </div>
  </div>
      </body>

       </html>`;

       await genmail(email,subto,demt);


      }







    }




}




catch (err){

  console.log(err.message);
  res.status(500).json({error:'Could not make admin changes'});

}

};


//use token from admin auth
export const approveref = async(req,res) =>{


try{

  const fromat = {
    refid: 3
  };
  if(!req.body) return res.status(400).json({error: 'Missing request body',format: fromat});

  const {refid} = req.body;

  const ah = req.headers['authorization'];
  if(!ah) return res.status(403).json({error: 'Miissing auth token'});
  if(!ah.startsWith('Bearer ')) return res.status(403).json({error: 'Invalid token format'});
  if(!refid) return res.status(403).json({error: 'Missing refid in request body', format: fromat});

  const token = ah.split(" ")[1];
  const decoded = vertok(token);
 // console.log(decoded);
  if(!decoded) return res.status(403).json({error:'Invalido tokeno'});
  const adm = decoded.id.admin;
  const adid = adm.id;

  if(!adm || !adm.hauth || !adm.verified || !(adm.role === 'admin' || adm.role === 'iadmin')) return res.status(403).json({error:'You cannot perform the action'});

  //confirm if he still admin

  const chea = await User.findByPk(adid);

  if(!chea) return res.status(401).json({error:'You are not allowed to do that'});
  const ched = chea.user_role;
  const chedv = chea.is_verified;
  const afid = chea.facility_id;
  if(!chedv || !(ched === 'admin' || ched === 'iadmin')) return res.status(403).json({error: 'You are not priviledged enough to perform that action'});

  const man = await User.findByPk(refid);
  if(!man) return res.status(404).json({error:'User not found'});
  const prf = man.user_role;
  const prv = man.is_verified;
  const email = man.email;
  if(chea.facility_id !== man.facility_id) return res.status(403).json({warn:'Please select a member of your facility'});
  const valref = User.findAll({where:{user_role: 'refmanager',facility_id: afid}});
  if(valref.length >= 2) return res.status(403).json({error: 'Facility already has enough Referral managers'});
  if(prf !== 'refmanagertobe') return res.status(401).json({error: 'User not eligible for approval'});
  if(prf === 'refmanager') return res.status(200).json({error:'User was already approved'});
  if(!prv) return res.status(403).json({error:`Cannot approve ${man.fname} ${man.lname} because he / she has not yet verifed email`});
  const newr = 'refmanager';

  await User.update({user_role:newr},{where:{email}});

  //// respond acha me niende zido


  const ner = await User.findOne({where:{email}});
  const faid = ner.facility_id;
  const fa = await Facility.findByPk(faid);
  const fane = fa?.fac_name || "Unknown";
  const fate = fa?.fac_type || "Unknown";

  const refp = { message: `Congratulations, you approved ${ner.fname} ${ner.lname} as a referral manager`,
                refmanager:{
                  name:`${ner.fname} ${ner.lname}`,
                  age: ner.age,
                  approved_by:`${chea.fname} ${chea.lname}`,
                  approved_at: ner.updated_at,
                  facility: fane,
                  facility_type: fate

                } 

  };



  res.status(201).json({
    refp
  });






  const refsu = `Approval as Referral Manager`
  

  const retemp = `<html>

  <head>
    <titile>You have been approved as a referral manager</title>
</head>
<body>
  <p>Dear ${ner.fname};</p>
  <p>You have been approved as a referral manager and can now assume that role</p>
</body>
  
  
  </html>`;



  await genmail(email,refsu,retemp);











  //send email that he is a ref manager now
  

 








}


catch(err)
{

  console.log(err.message);
  res.status(500).json({error:'Could not perform approval'});




}




};


//create referralmanager...





