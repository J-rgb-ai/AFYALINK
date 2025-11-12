/**
 * this is the referral manager controller
 * ref manager created himself at signup
 * then he gave himself role of refmantobe in db
 * only if he verifes his email willhe be given a token for refmanager approval
 * admin to select him by id on admin dashboard...
 * upon signup he willbe notifed on email that he requested to be refman
 * kaa role ni assign anaenda uko
 * admin will aprove then he verfifes his email(refmanager)
 * upon approval he will be told that he is approved a s a ref manager
 * then given a token at login that shows he is ref manager as a role..
 * it will be used to perform all ref manager roles
 * and verified his email
 * then he becomes a real ref manager
 * 
 //SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract simplestorage{
    uint256 public fav = 34;

    struct p {
        uint256 n;
        string ne;
    }

    p public c = p(12,'cyril');
    p public i = p({ne:'imbwaga',n:24});
    p[] public  l;

function st(uint256 f) public  {
    fav = f;
}
function r() public  view returns (uint256){
    return fav;
}

function addp(string memory ane,uint256 ano) public{
    l.push(p({ne:ane,n:ano}));
}

}

 *

on authctrl at signup if userrole is doctor then  he will have a different payload


doctor or surgeon or nurse  requesta a referral
 * 
 * ref manager approves the referrals and only approved ones will  be made to happen..
 */


import Referral from "../config/db/orm/ormmodels/referrals.js";
import vertok from "../utils/jwt/verjwt.js";
import ReferralNote from "../config/db/orm/ormmodels/refnotes.js";
import User from "../config/db/orm/ormmodels/user.js";
import Patient from "../config/db/orm/ormmodels/patients.js";
import Facility from "../config/db/orm/ormmodels/facility.js";
import { genmail } from "../utils/mail/mailer.js";
import chalk from "chalk";
import { format } from "morgan";
import Doctor from "../config/db/orm/ormmodels/doctors.js";
import { json } from "sequelize";
import Surgeon from "../config/db/orm/ormmodels/surgeon.js";
import Nurse from "../config/db/orm/ormmodels/nurse.js";
import Labtech from "../config/db/orm/ormmodels/labtechs.js";
import Visit from "../config/db/orm/ormmodels/visits.js";







//dashboard  ya ref man

//aome tu referrals za facilty yake if zko kwa status ya tobeapproved

export const refmandah = async(req,res) =>{

try{

    const ah = req.headers['authorization'];
    if(!ah) return res.status(403).json({error:'Missing auth token'});
    if(!ah.startsWith("Bearer ")) return res.status(401).json({error:'Invalid token format'});
    const token = ah.split(" ")[1];
    const decoded = vertok(token);
    if(!decoded) return res.status(401).json({error:'Invalid or expired token'});
    const refa = decoded?.id?.refmanager;
    if(!refa || !refa.verified || refa.role !== 'refmanager') return res.status(403).json({error:'Likely a smuggled token'});

    const referrals = await Referral.findAll({
        include: [
          {
            model: User,
            as: 'referrer',
            attributes: ['id', 'fname', 'lname', 'email', 'user_role']
          },
          {
            model: Patient,
            as: 'patient',
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'fname', 'lname', 'email', 'phone', 'gender', 'age']
              }
            ]
          },
          {
            model: Facility,
            as: 'facilityfrom',
            attributes: ['fac_name', 'fac_type']
          },
          {
            model: Facility,
            as: 'facilityto',
            attributes: ['fac_name', 'fac_type']
          },
          {
            model: ReferralNote,
            as: 'not',
            attributes:['note']
          }
        ],
        order: [['created_at', 'DESC']]
      });


      const refdash = referrals.map(ref => ({
        referral_id: ref.id,
        status: ref.status,
        priority: ref.priority,
        reason: ref.reason,
        notes: ref.note,
        summary: ref.not.notes,

        referred_on: ref.created_at,
        from_facility: {
          name: ref.facilityfrom?.fac_name,
          type: ref.facilityfrom?.fac_type
        },
        to_facility: {
          name: ref.facilityto?.fac_name,
          type: ref.facilityto?.fac_type
        },
        doctor: {
          name: `${ref.referrer?.fname} ${ref.referrer?.lname}`,
          email: ref.referrer?.email,
          role: ref.referrer?.user_role
        },
        patient: {
          name: `${ref.patient?.user?.fname} ${ref.patient?.user?.lname}`,
          gender: ref.patient?.user?.gender,
          age: ref.patient?.user?.age,
          contact: {
            email: ref.patient?.user?.email,
            phone: ref.patient?.user?.phone
          },
          blood_type: ref.patient?.blood_type,
          allergies: ref.patient?.allergies,
          chronic_conditions: ref.patient?.chronic_conditions,
          insured: ref.patient?.is_insured ?? 'Not insured',
          insurance_type: ref.patient?.insurance_type ?? 'Not specified'
        }
      }));


      res.status(200).json({Referrals:{refdash}});
      
      
     




}

catch(err){

console.log(err.message);
res.status(500).json({error:'Could not fetch details'});



}













};


















//approve or reject referrals

//only approved referrals za facility

export const approveref1 = async(req,res) =>{

try{

  const formi = {
    refid: 2,
    approve: 'yes/no'
  };


    if(!req.body) return res.status(404).json({error:'Missing request body', format: formi});
    const {refid,approve} = req.body;

    const ah = req.headers['authorization'];
    if(!ah) return res.status(401).json({error:'missing auth token'});
    if(!ah.startsWith("Bearer ")) return res.status(401).json({error:'Invalid token format'});
    if(!refid || !approve) return res.status(401).json({error:'Please specify referral id and approve action',format: formi});
    const token = ah.split(" ")[1];
    const decoded = vertok(token);
    if(!decoded) return res.status(403).json({error:'Invalid or expired token'});
    const refa = decoded?.id?.refmanager;
    const refmani = refa.id;
    if(!refa || !refa.verified || refa.role !== 'refmanager') return res.status(403).json({error:'Did you smuggle this token?'});

    const getref = await User.findByPk(refmani);
    if(!getref) return res.status(404).json({error:'Referral manager is not registerd yet'});
     const dre = await Referral.findByPk(refid);
     if(!dre) return res.status(404).json({error:'Referral not found'});
     const refuid = dre.referring_user_id;
     const patuid = dre.patient_id;
     const refn = await ReferralNote.findOne({where:{referral_id:refid}});
     const refu = await User.findByPk(refuid);
     const refuc = refu.facility_id;
     const refdih = getref.facility_id;
     const refc = await Facility.findByPk(refdih);
     const docf = await Facility.findByPk(refuc);
     if(!refc || ! docf) return res.status(404).json({error: 'Both refemanager and referree are from ghost facilities'});

     //comment this to change ref manager to approve from all facilities
     if(refuc !== refdih) return res.status(403).json({error: `You are from ${refc.fac_name} (${refc.fac_type}) and the referral is from ${docf.fac_name} (${docf.fac_type}) and you can only approve referrals from your facility`});
     if(!refu) return res.status(404).json({error:'Referrer has not fully completed application'});
     const pat = await Patient.findByPk(patuid);
     if(!pat) return res.status(404).json({error:'Patient has not fully completed application'});
     const pti = pat.user_id;
     const patu = await User.findByPk(pti);
     if(!patu) return res.status(404).json({error:'Patient is not  a registered  user'});
     const fcto = dre.receiving_facility_id;
     const fcfro = dre.referring_facility_id;
     const facto = await Facility.findByPk(fcto);
     if(!facto || !facto.is_active) return res.status({error:'Cnnot refer to an inactive facility'});
     const facfro = await Facility.findByPk(fcfro);
     if(!facfro) return res.status(404).json({error:'Facility not found'});
     if(fcfro !== getref.facility_id) return res.status(403).json({warn:`Cannot make approval to Referrals that are not from your facility`});


     if(approve === 'yes'){

        if(dre.status === 'rejected' || dre.status === 'tobeapproved'){
            const ts = 'approved';

            await Referral.update({status:ts},{where:{id:refid}});

            //send email both to doctor and patient
            const patem = patu.email;
            const docem = refu.email;
            const refem = getref.email;
            const sub = `Approval of Referral`;


            const patemp = `
<html>
<head>
  <meta charset="UTF-8">
  <title>New Medical Referral</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f7f9fc;
      color: #333;
      padding: 20px;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 20px;
      max-width: 600px;
      margin: auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h2 {
      color: #2a7ae2;
    }
    .section {
      margin-bottom: 20px;
    }
    .label {
      font-weight: bold;
    }
    .footer {
      font-size: 0.9em;
      color: #777;
      text-align: center;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>You've Received a New Medical Referral</h2>
    <p>Dear <strong>${patu.fname}</strong>,</p>
    <p>You have been referred by ${refu.user_role} <strong>${refu.fname} ${refu.lname}</strong> (${refu.user_role}) at <strong>${facfro.fac_name}</strong>.</p>
    p>The referral has been approved. Please await acceptance by The referral manager at ${facto.fac_name} (${facto.fac_type})</p>
    <p>We will then notify you via email: ${patu.email}</p>
    <div class="section">
      <h3>Referral Details</h3>
      <p><span class="label">Reason:</span> ${dre.reason}</p>
      <p><span class="label">Priority:</span> ${dre.priority}</p>
      <p><span class="label">Status:</span> ${dre.status} → ${ts}</p>
      <p><span class="label">From:</span> ${facfro.fac_name} (${facfro.fac_type})</p>
      <p><span class="label">To:</span> ${facto.fac_name} (${facto.fac_type})</p>
      <p><span class="label">Approved By:</span> ${getref.fname}</p>
      <p><span class="label">Approved At:</span> ${dre.updated_at}</p>
    </div>

    <div class="section">
      <h3>${refu.user_role} Notes</h3>
      <p>${dre.notes || 'No notes provided'}</p>
    </div>

    <div class="section">
      <h3>Referral Summary</h3>
      <p>${refn?.note || 'No summary available'}</p>
    </div>

    <p>Please log in to your ${patu.user_role} dashboard to view full details and next steps.</p>

    <div class="footer">
      <p>AFYALINK</p>
      <p>This is an automated message from afyalink. do <b>not</b> reply</p>
    </div>
  </div>
</body>
</html>
`;


const doctemp = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Medical Referral</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f7f9fc;
      color: #333;
      padding: 20px;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 20px;
      max-width: 600px;
      margin: auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h2 {
      color: #2a7ae2;
    }
    .section {
      margin-bottom: 20px;
    }
    .label {
      font-weight: bold;
    }
    .footer {
      font-size: 0.9em;
      color: #777;
      text-align: center;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Referral has been accepted</h2>
    <p>Dear <strong>${refu.lname}</strong>,</p>
    <p>  You : <strong>${refu.fname} ${refu.lname}</strong> of role (${refu.user_role}) created a referral from <strong>${facfro.fac_name}</strong>.</p>
    <p>The referral has been approved. Please await acceptance by The referral manager at ${facto.fac_name} (${facto.fac_type})</p>
    <p>We will then notify you via email: ${refu.email}</p>
    <div class="section">
      <h3>Referral Details</h3>
      <p><span class="label">Reason:</span> ${dre.reason}</p>
      <p><span class="label">Priority:</span> ${dre.priority}</p>
      <p><span class="label">Status:</span> ${dre.status} → ${ts}</p>
      <p><span class="label">From:</span> ${facfro.fac_name} (${facfro.fac_type})</p>
      <p><span class="label">To:</span> ${facto.fac_name} (${facto.fac_type})</p>
      <p><span class="label">Approved By:</span> ${getref.fname}</p>
      <p><span class="label">Approved At:</span> ${dre.updated_at}</p>
    </div>

    <div class="section">
      <h3>Doctor's Notes</h3>
      <p>${dre.notes || 'No notes provided'}</p>
    </div>

    <div class="section">
      <h3>Referral Summary</h3>
      <p>${refn?.note || 'No summary available'}</p>
    </div>

    <p>Please log in to your ${refu.user_role} dashboard to view full details.</p>

    <div class="footer">
      <p>AFYALINK</p>
      <p>This is an automated message from afyalink. please do not reply directly</p>
    </div>
  </div>
</body>
</html>
`;

const refmant =`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Medical Referral</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f7f9fc;
      color: #333;
      padding: 20px;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 20px;
      max-width: 600px;
      margin: auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h2 {
      color: #2a7ae2;
    }
    .section {
      margin-bottom: 20px;
    }
    .label {
      font-weight: bold;
    }
    .footer {
      font-size: 0.9em;
      color: #777;
      text-align: center;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>You've Approved a New Medical Referral</h2>
    <p>Dear <strong>${getref.fname}</strong>,</p>
    <p>You approved a Referral by ${refu.user_role}: <strong>${refu.fname} ${refu.lname}</strong> (${refu.user_role}) at <strong>${facfro.fac_name}</strong>.</p>

    <div class="section">
      <h3>Referral Details</h3>
      <p><span class="label">Reason:</span> ${dre.reason}</p>
      <p><span class="label">Priority:</span> ${dre.priority}</p>
      <p><span class="label">Status:</span> ${dre.status} → ${ts}</p>
      <p><span class="label">From:</span> ${facfro.fac_name} (${facfro.fac_type})</p>
      <p><span class="label">To:</span> ${facto.fac_name} (${facto.fac_type})</p>
      <p><span class="label">Approved By:</span> ${getref.fname}</p>
      <p><span class="label">Approved At:</span> ${dre.updated_at}</p>
    </div>

    <div class="section">
      <h3>Doctor's Notes</h3>
      <p>${dre.notes || 'No notes provided'}</p>
    </div>

    <div class="section">
      <h3>Referral Summary</h3>
      <p>${refn?.note || 'No summary available'}</p>
    </div>

    <p>Please log in to your Referral manager  dashboard to view full details and next steps.</p>

    <div class="footer">
      <p>— AFYALINK</p>
      <p>automated message do not reply</p>
    </div>
  </div>
</body>
</html>
`;


await genmail(patem,sub,patemp);
await genmail(docem,sub,doctemp);
await genmail(refem,sub,refmant);

//send group referral email
//to the refmans at fac to 
//to refmans at facfrom 

const rtin = await User.findAll({where:{user_role: 'refmanager', facility_id: fcfro}});
const rfon = await User.findAll({where:{user_role: 'refmanager', facility_id: fcto}});
if(!rtin || !rfon) return res.status(403).json({warn: 'Only facilities with referral managers can make referrals'});

//fac from
for(i=0;i<rtin.length;i++){

  const email = rtin[i].email;
  const sub = `Approveval  of referral by ${getref.user_role} ${getref.lname} ${getref.fname}`;
  if(email !== getref.email) 
  {
    const refmant =`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Medical Referral</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f7f9fc;
      color: #333;
      padding: 20px;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 20px;
      max-width: 600px;
      margin: auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h2 {
      color: #2a7ae2;
    }
    .section {
      margin-bottom: 20px;
    }
    .label {
      font-weight: bold;
    }
    .footer {
      font-size: 0.9em;
      color: #777;
      text-align: center;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>${getref.lname} ${getref.fname} Approved a New Medical Referral</h2>
    <p>Dear <strong>${rtin[i].fname}</strong>,</p>
    <p> ${getref.fname} ${getref.lname}  approved a Referral by ${refu.user_role}: <strong>${refu.fname} ${refu.lname}</strong> (${refu.user_role}) at <strong>${facfro.fac_name}</strong>.</p>

    <div class="section">
      <h3>Referral Details</h3>
      <p><span class="label">Reason:</span> ${dre.reason}</p>
      <p><span class="label">Priority:</span> ${dre.priority}</p>
      <p><span class="label">Status:</span> ${dre.status} → ${ts}</p>
      <p><span class="label">From:</span> ${facfro.fac_name} (${facfro.fac_type})</p>
      <p><span class="label">To:</span> ${facto.fac_name} (${facto.fac_type})</p>
      <p><span class="label">Approved By:</span> ${getref.fname}</p>
      <p><span class="label">Approved At:</span> ${dre.updated_at}</p>
    </div>

    <div class="section">
      <h3>Doctor's Notes</h3>
      <p>${dre?.notes || 'No notes provided'}</p>
    </div>

    <div class="section">
      <h3>Referral Summary</h3>
      <p>${refn?.note || 'No summary available'}</p>
    </div>

    <p>Please log in to your Referral manager  dashboard to view full details and next steps.</p>

    <div class="footer">
      <p>— AFYALINK</p>
      <p>automated message do not reply</p>
    </div>
  </div>
</body>
</html>
`;

await genmail(email,sub,refmant);



  }
  

}


for(i=0; i<rfon.length; i++)
{


  const email = rfon[i].email;
  const sub = `You have a New Referral from ${facfro.fac_name} (${facfro.fac_type}) awaiting acceptance`;

  const refmant =`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Medical Referral</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f7f9fc;
      color: #333;
      padding: 20px;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 20px;
      max-width: 600px;
      margin: auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h2 {
      color: #2a7ae2;
    }
    .section {
      margin-bottom: 20px;
    }
    .label {
      font-weight: bold;
    }
    .footer {
      font-size: 0.9em;
      color: #777;
      text-align: center;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>You've Approved a New Medical Referral</h2>
    <p>Dear <strong>${rfon[i].fname}</strong>,</p>
    <p>${getref.fname} ${getref.lname} from ${facfro.fac_name} (${facfro.fac_type}) approved a Referral by ${refu.user_role}: <strong>${refu.fname} ${refu.lname}</strong> at <strong>${facfro.fac_name}</strong>.</p>
    <p> This referral awaits <b>acceptance<b> at your facility before further action</p>
    <div class="section">
      <h3>Referral Details</h3>
      <p><span class="label">Reason:</span> ${dre.reason}</p>
      <p><span class="label">Priority:</span> ${dre.priority}</p>
      <p><span class="label">Status:</span> ${dre.status} → ${ts}</p>
      <p><span class="label">From:</span> ${facfro.fac_name} (${facfro.fac_type})</p>
      <p><span class="label">To:</span> ${facto.fac_name} (${facto.fac_type})</p>
      <p><span class="label">Approved By:</span> ${getref.fname}</p>
      <p><span class="label">Approved At:</span> ${dre.updated_at}</p>
    </div>

    <div class="section">
      <h3>Doctor's Notes</h3>
      <p>${dre?.notes || 'No notes provided'}</p>
    </div>

    <div class="section">
      <h3>Referral Summary</h3>
      <p>${refn?.note || 'No summary available'}</p>
    </div>

    <p>Please log in to your Referral manager  dashboard to view full details and next steps.</p>

    <div class="footer">
      <p>— AFYALINK</p>
      <p>automated message do not reply</p>
    </div>
  </div>
</body>
</html>
`;

await genmail(email,sub,refmant);



}








            const refp = {
                message: `Referral approved by ${getref.fname}`,
                Referral:{
                    Refferer_name: `${refu.fname} ${refu.lname}`,
                    Role: refu.user_role,
                    Patient_name:`${patu.fname} ${patu.lname}`,
                    prevstat:dre.status,
                    currentstat:ts,
                    from: facfro.fac_name,
                    type: facfro.fac_type,
                    to: facto.fac_name,
                    is: facto.fac_type,
                    reason: dre.reason,
                    priority: dre.priority,
                    notes:dre.notes,
                    summary:refn?.note || 'No summary',
                    appoved_at:dre.updated_at

                } 

            };


            return res.status(200).json({refp});





        }
else{


    return res.status(403).json({error: `Cannot approve referral of status: ${dre.status}`});



}




     }

     else if(approve === 'no'){

        if(dre.status ==='tobeapproved')
        {

            const ts = 'rejected';

            await Referral.update({status:ts},{where:{id:refid}});

            //send email



            const patem = patu.email;
            const docem = refu.email;
            const refem = getref.email;
            const sub = `Approval of Referral`;


            const patemp = `
<html>
<head>
  <meta charset="UTF-8">
  <title>Rejected  Medical Referral</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f7f9fc;
      color: #333;
      padding: 20px;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 20px;
      max-width: 600px;
      margin: auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h2 {
      color: #2a7ae2;
    }
    .section {
      margin-bottom: 20px;
    }
    .label {
      font-weight: bold;
    }
    .footer {
      font-size: 0.9em;
      color: #777;
      text-align: center;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Your Referral was rejected</h2>
    <p>Dear <strong>${patu.fname}</strong>,</p>
    <p>Rjected referral info: Referred by  ${refu.user_role}. <strong>${refu.fname} ${refu.lname}</strong> (${refu.user_role}) at <strong>${facfro.fac_name}</strong>.</p>

    <div class="section">
      <h3>Referral Details</h3>
      <p><span class="label">Reason:</span> ${dre.reason}</p>
      <p><span class="label">Priority:</span> ${dre.priority}</p>
      <p><span class="label">Status:</span> ${dre.status} → ${ts}</p>
      <p><span class="label">From:</span> ${facfro.fac_name} (${facfro.fac_type})</p>
      <p><span class="label">To:</span> ${facto.fac_name} (${facto.fac_type})</p>
      <p><span class="label">Rejected By:</span> ${getref.fname}</p>
      <p><span class="label">Rejected At:</span> ${dre.updated_at}</p>
    </div>

    <div class="section">
      <h3>Doctor's Notes</h3>
      <p>${dre.notes || 'No notes provided'}</p>
    </div>

    <div class="section">
      <h3>Referral Summary</h3>
      <p>${refn?.note || 'No summary available'}</p>
    </div>

    <p>Please log in to your ${patu.user_role} dashboard to view full details and next steps.</p>

    <div class="footer">
      <p>AFYALINK</p>
      <p>This is an automated message from afyalink. do <b>not</b> reply</p>
    </div>
  </div>
</body>
</html>
`;


const doctemp = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Medical Referral</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f7f9fc;
      color: #333;
      padding: 20px;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 20px;
      max-width: 600px;
      margin: auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h2 {
      color: #2a7ae2;
    }
    .section {
      margin-bottom: 20px;
    }
    .label {
      font-weight: bold;
    }
    .footer {
      font-size: 0.9em;
      color: #777;
      text-align: center;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Referral has been rejected</h2>
    <p>Dear <strong>${refu.lname}</strong>,</p>
    <p> <strong>${refu.fname} ${refu.lname}</strong> (${refu.user_role}) at <strong>${facfro.fac_name}</strong>.</p>

    <div class="section">
      <h3>Referral Details</h3>
      <p><span class="label">Reason:</span> ${dre.reason}</p>
      <p><span class="label">Priority:</span> ${dre.priority}</p>
      <p><span class="label">Status:</span> ${dre.status} → ${ts}</p>
      <p><span class="label">From:</span> ${facfro.fac_name} (${facfro.fac_type})</p>
      <p><span class="label">To:</span> ${facto.fac_name} (${facto.fac_type})</p>
      <p><span class="label">Rejected By:</span> ${getref.fname}</p>
      <p><span class="label">Rejected At:</span> ${dre.updated_at}</p>
    </div>

    <div class="section">
      <h3>Doctor's Notes</h3>
      <p>${dre.notes || 'No notes provided'}</p>
    </div>

    <div class="section">
      <h3>Referral Summary</h3>
      <p>${refn?.note || 'No summary available'}</p>
    </div>

    <p>Please log in to your ${refu.user_role} dashboard to view full details.</p>

    <div class="footer">
      <p>AFYALINK</p>
      <p>This is an automated message from afyalink. please do not reply directly</p>
    </div>
  </div>
</body>
</html>
`;

const refmant =`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Medical Referral</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f7f9fc;
      color: #333;
      padding: 20px;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 20px;
      max-width: 600px;
      margin: auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h2 {
      color: #2a7ae2;
    }
    .section {
      margin-bottom: 20px;
    }
    .label {
      font-weight: bold;
    }
    .footer {
      font-size: 0.9em;
      color: #777;
      text-align: center;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>You've rejected  a New Medical Referral</h2>
    <p>Dear <strong>${getref.fname}</strong>,</p>
    <p>You Rejected a Referral by ${refu.user_role} <strong>${refu.fname} ${refu.lname}</strong> (${refu.user_role}) at <strong>${facfro.fac_name}</strong>.</p>

    <div class="section">
      <h3>Referral Details</h3>
      <p><span class="label">Reason:</span> ${dre.reason}</p>
      <p><span class="label">Priority:</span> ${dre.priority}</p>
      <p><span class="label">Status:</span> ${dre.status} → ${ts}</p>
      <p><span class="label">From:</span> ${facfro.fac_name} (${facfro.fac_type})</p>
      <p><span class="label">To:</span> ${facto.fac_name} (${facto.fac_type})</p>
      <p><span class="label">Rejected By:</span> ${getref.fname}</p>
      <p><span class="label">Rejected At:</span> ${dre.updated_at}</p>
    </div>

    <div class="section">
      <h3>Doctor's Notes</h3>
      <p>${dre.notes || 'No notes provided'}</p>
    </div>

    <div class="section">
      <h3>Referral Summary</h3>
      <p>${refn?.note || 'No summary available'}</p>
    </div>

    <p>Please log in to your Referral manager  dashboard to view full details and next steps.</p>

    <div class="footer">
      <p>— AFYALINK</p>
      <p>automated message do not reply</p>
    </div>
  </div>
</body>
</html>
`;

await genmail(patem,sub,patemp);
await genmail(docem,sub,doctemp);
await genmail(refem,sub,refmant);

//send mail that nani alireject... is this necessary though or am i petty
const ringoz = await User.findAll({where: {facility_id: facfro, user_role: 'refmanager'}});
for(i=0;i<ringoz.length;i++)
{
const email = ringoz[i].email;
const sub = `${getref.fname} ${getref.lname} Rejected a referral at ${new Date()}`;
if(email !== getref.email)
{

  const refmant =`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Medical Referral</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f7f9fc;
      color: #333;
      padding: 20px;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 20px;
      max-width: 600px;
      margin: auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h2 {
      color: #2a7ae2;
    }
    .section {
      margin-bottom: 20px;
    }
    .label {
      font-weight: bold;
    }
    .footer {
      font-size: 0.9em;
      color: #777;
      text-align: center;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Rejection of  a Medical Referral</h2>
    <p>Dear <strong>${ringoz[i].lname}</strong>,</p>
    <p>${getref.fname} ${getref.lname}  Rejected a Referral by ${refu.user_role} <strong>${refu.fname} ${refu.lname}</strong> (${refu.user_role}) at <strong>${facfro.fac_name}</strong>.</p>

    <div class="section">
      <h3>Referral Details</h3>
      <p><span class="label">Reason:</span> ${dre.reason}</p>
      <p><span class="label">Priority:</span> ${dre.priority}</p>
      <p><span class="label">Status:</span> ${dre.status} → ${ts}</p>
      <p><span class="label">From:</span> ${facfro.fac_name} (${facfro.fac_type})</p>
      <p><span class="label">To:</span> ${facto.fac_name} (${facto.fac_type})</p>
      <p><span class="label">Rejected By:</span> ${getref.fname}</p>
      <p><span class="label">Rejected At:</span> ${dre.updated_at}</p>
    </div>

    <div class="section">
      <h3>${refu.user_role} Notes</h3>
      <p>${dre.notes || 'No notes provided'}</p>
    </div>

    <div class="section">
      <h3>Referral Summary</h3>
      <p>${refn?.note || 'No summary available'}</p>
    </div>

    <p>Please log in to your Referral manager  dashboard to view full details and next steps.</p>

    <div class="footer">
      <p>— AFYALINK</p>
      <p>automated message do not reply</p>
    </div>
  </div>
</body>
</html>
`;


  await genmail(email,sub,refmant);
}



}









            const refp = {
                message: `Referral rejected by ${getref.fname}`,
                Referral:{
                    Refferer_name: `${refu.fname} ${refu.lname}`,
                    Role: refu.user_role,
                    Patient_name:`${patu.fname} ${patu.lname}`,
                    prevstat: dre.status,
                    currentstat: ts,
                    from: facfro.fac_name,
                    type: facfro.fac_type,
                    to: facto.fac_name,
                    is: facto.fac_type,
                    reason: dre.reason,
                    priority: dre.priority,
                    notes:dre.notes,
                    summary:refn?.note || 'No summary',
                    rejected_at:dre.updated_at

                } 

            };


            return res.status(200).json({refp});


        }

        else {


            return res.status(403).json({error: `Cannot reject referral of status ${dre.status}`});
        }


     }



}

catch(err)

{

    console.log(err.message);
    res.status(500).json({error:'Could not make referral changes'});





}



};




/**
 * doc nurse labtech,surgeon  wanacreate referral 
 * afuu inakua kwa status ya to be approved
 * refman aki aprove inakua approved stat
 * aki reject inakua rejected
 * refman wa uko anakua updated ako na new referral incaes ikue approved
 * afuu sasa ana reject ama ana accept
 * then kitu amedo itaambiwa refman wa io hosi ili refer
 * aki accept ni wapange vle mgonjwa atakam 
 * only approve refs if you are the refman of that facility
 * ikiingia hosi ingine inakua sent
 * refman wa uko aneza reject bado
 * iki fika inakua recieved afuu inakua accepted
 * then inakua completed mgojwa akifikaaa
 * confirm if patient has really vivsted facilty if not cant refer
 */




export const createrefah = async(req,res) =>{

  try{



    const formi = {
      patient_id: 2,
      receiving_fac_id: 3,
      reason: 'CT scan',
      priority: 'Routine/Urgent/emergency',
      notes: 'need patient for ct scan asap  check for brain damage since accident',
      need_date: '12/5/2025 (Date you need the referral to be)'
    };

    if(!req.body) return res.status(400).json({error: 'Missing request body', format: formi});
    const {patient_id,receiving_fac_id,reason,priority,notes} = req.body;
    if(!patient_id || !receiving_fac_id || priority || !reason || !need_date) return res.status(422).json({error: 'Missing some required fields',format: formi});

    const ah = req.headers['authorization'];
    if(!ah) return res.status(401).json({error: 'Missing auth header '});
    if(!ah.startsWith('Bearer ')) return res.status(403).json({error: 'Invalid token format'});
    const token = ah.split(" ")[1];
    const decoded = vertok(token);
    const p = await Patient.findByPk(patient_id);
    const f = await Facility.findByPk(receiving_fac_id);
    if(!p) return res.status(401).json({error: 'Invalid patient id'});
    if(!f) return res.status(401).json({error: 'Invalid facility id'});
    const ui = p.user_id;
    const u = await User.findByPk(ui);
    if(!u) return res.status(403),json({error: 'Patient not registered'});
    if(!u.is_verified) return res.status(403).json({error: 'Patient has not verifed email'});
    if(!f.is_active) return res.status(403).json({error: `Cannot refer to ${f.fac_name} (${f.fac_type}) because it is inactive at the moment`});
    if(!decoded) return res.status(403).json({error: 'Invalid or expired token'});
    const dc = decoded?.id?.doctor;
    const sj = decoded?.id.surgeon;
    const ns = decoded?.id?.nurse;
    const lb = decoded?.id?.labtech;


    if(dc)
    {

      const docid = dc.docid;
      const usid = dc.userId;
      if(!dc.lic_no || !dc.verified || !dc.role !== 'doctor') return res.status(403).json({warn:`Unauthorized action detected at: ${new Date()}`});

      const doc = await Doctor.findByPk(docid);
      const user = await User.findByPk(usid);
      if(!doc) return res.status(403).json({error: 'Please submit your doctor details first'});
      if(!user) return res.status(403).json({error: 'Unregistered user cannot perform this action'});
      if(user.user_role !== 'doctor') return res.status(401).json({error: `You are not a doctor ${user.fname} ${user.lname} you are of role ${user.user_role}`});
      if(!user.is_verified) return res.status(403).json({error: 'Please verify email first'});
      const faci = user.facility_id;
      const fc = await Facility.findByPk(faci);
      const req_date = new Date();

      const v = await Visit.findOne({where:{server_id: usid, patient_id: patient_id, facility_id: faci, infacility: true}});
      if(!v) return res.status(422).json({error: 'Cannot Refer patient who has not visited the facility'});
      const visd = v.id;
      

      const tr = await Referral.create({
        patient_id,
        reffering_user_id: usid,
        reffering_facility_id: faci,
        receiving_facility_id: receiving_fac_id,
        reason,
        priority,
        status: 'tobeapproved',
        notes,
        req_date,
        need_date,
        visit_id: visd

      });
      if(!tr) throw new Error('Could not create referral');
      const note = `A Referral was created for patient ${u.fname} ${u.lname} from ${fc,fac_name} (${fc.fac_type}) to ${f.fac_name} (${f.fac_type}) by ${user.user_role}: ${user.fname} ${user.lname} for reason: ${reason} and priority: ${priority} at ${req_date} needed to be done on ${need_date}`;
      const rid = tr.id;
      await ReferralNote.create({
        referral_id: rid,
        author_id: usid,
        note
      });

      await Visit.update({referral_id: rid},{where:{server_id: usid, patient_id: patient_id, facility_id: faci, infacility: true}});
      


      //tell refmanager and patient and doc about it send an email btw nafaa kutumia for lop apo kwa ref wueh


      const rr = await Referral.findByPk(rid);
      const rn = await ReferralNote.findOne({where:{referral_id: rid}});
      if(!rr || !rn) return res.status(404).json({error: 'Referral not created and so not found'});

      const payl = {
        message: `Referral created succesfully please await approval by referral manager`,
        creator:{
          userId: user.id,
          name: `${user.fname} ${user.lname}`,
          role: user.user_role,
          verified: user.is_verified,
          facility: `${fc.fac_name} (${fc.fac_type})`,
          email: user.email
        },
        patient:{
          id: p.id,
          name: `${u.fname} ${u.lname}`,
          verified: u.is_verified,
          blood_type: p?.blood_type  || 'Not specifed',
          allergies: p?.allergies || 'No allergies specifed',
          chronic_conditions: p?.chronic_conditions || 'Not given',
          emergency_cont:{
            name: p?.emergency_cont_name || 'Not given',
            phone: p?.emergency_cont_phone || 'Not given either'
          }
        },
        referral:{
          id: rr.id,
          reffering_user_id: usid,
          reffering_facility_id: faci,
          receiving_facility_id: receiving_fac_id,
          reason: rr.reason,
          priority: rr.priority,
          status: rr.status,
          req_date: rr.req_date,
          need_date: rr.need_date,
          from: `${fc.fac_name} (${fc.fac_type})`,
          to: `${f.fac_name} (${f.fac_type})`,
          notes: rr.motes,
          summary: rn.note,
          created_at: rr.created_at,
          updated_At: rr.updated_at

        }
      };


      //send emails to refman patient and ho created ref
      const rfm = await User.findAll({where:{user_role: 'referralmanager', facility_id: faci}});
      const refi = rfm.map(e=> e.email); //not even necessary why did i even map this shi
      

for(i=0; i<rfm.length; i++)
{

refmail = rfm[i].email;
const subj = 'You a new Referral to approve';

const temp = `<html>
<head><title>New Referral awaits your approval priority <b>${rr.priority}<b> </title></head>
<body>
  <p>Dear ${rfm[i].lname};<p><br>
  <p>${note} </p>
</body>
</html>`;

await genmail(refmail,subj,temp);


}


const patmail = u.email;
const cretmail = user.email;

const ps = 'A referral has been created for you';
const cs = 'You created a referral';
const ptemp = `<html>
<head><title>A new Referral was created for you of priority:<b>${rr.priority}<b> </title></head>
<body>
  <p>Dear ${u.lname};<p><br>
  <p>${note} </p>
  <p>Please await approval by referral manager</p>
</body>
</html>`;

const ctemp = `<html>
<head><title> You created a New Referral. of priority <b>${rr.priority}<b> </title></head>
<body>
  <p>Dear ${user.lname};<p><br>
  <p>${note} </p>
  <p>Please await approval by referral manager</p>
</body>
</html>`;

await genmail(patmail,ps,ptemp);
await genmail(cretmail,cs,ctemp);








      return res.status(201).json({payl});







    }

    else if(sj)
    {
      const sid = saj.surgeonId;
      const did = saj.doctorId;
      const usid = saj.userId;
      const doc = await Doctor.findByPk(did);
      const saj = await Surgeon.findByPk(sid);
      const user = await User.findByPk(usid);
      if(!sj.verified || !sj.lic_no) return res.status(403).json({warn: 'Did you smuggle this token'});
      if(!doc) return res.status(403).json({error:'Please are you supposed to be here'});
      if(!saj) return res.status(403).json({error: 'You are not among our surgeon recored please submit yhem'});
      if(!user) return res.status(404).json({error:'Unregistered user cannot perform this action'});
      if(user.user_role !== 'doctor') return res.status(401).json({warn: `user of role ${user.user_role} not allowed to perform this action`});
      if(!user.is_verified) return res.status(403).json({error: 'Unverified user not allowed to do this'});

      const faci = user.facility_id;
      const fc = await Facility.findByPk(faci);
      const req_date = new Date();
      const v = await Visit.findOne({where:{server_id: usid, patient_id: patient_id, facility_id: faci, infacility: true}});
      if(!v) return res.status(422).json({error: 'Cannot Refer patient who has not visited the facility'});
      const visd = v.id;
      
      

      const tr = await Referral.create({
        patient_id,
        reffering_user_id: usid,
        reffering_facility_id: faci,
        receiving_facility_id: receiving_fac_id,
        reason,
        priority,
        status: 'tobeapproved',
        notes,
        req_date,
        need_date,
        visit_id: visd

      });
      if(!tr) throw new Error('Could not create referral');
      const note = `A Referral was created for patient ${u.fname} ${u.lname} from ${fc,fac_name} (${fc.fac_type}) to ${f.fac_name} (${f.fac_type}) by ${user.user_role}: ${user.fname} ${user.lname} for reason: ${reason} and priority: ${priority} at ${req_date}`;
      const rid = tr.id;
      await ReferralNote.create({
        referral_id: rid,
        author_id: usid,
        note
      });

      await Visit.update({referral_id: rid},{where:{server_id: usid, patient_id: patient_id, facility_id: faci, infacility: true}});


      //send email..

      const rr = await Referral.findByPk(rid);
      const rn = await ReferralNote.findOne({where:{referral_id: rid}});
      if(!rr || !rn) return res.status(404).json({error: 'Referral not created and so not found'});

      const payl = {
        message: `Referral created succesfully please await approval by referral manager`,
        creator:{
          userId: user.id,
          name: `${user.fname} ${user.lname}`,
          role: user.user_role,
          verified: user.is_verified,
          facility: `${fc.fac_name} (${fc.fac_type})`,
          email: user.email
        },
        patient:{
          id: p.id,
          name: `${u.fname} ${u.lname}`,
          verified: u.is_verified,
          blood_type: p?.blood_type  || 'Not specifed',
          allergies: p?.allergies || 'No allergies specifed',
          chronic_conditions: p?.chronic_conditions || 'Not given',
          emergency_cont:{
            name: p?.emergency_cont_name || 'Not given',
            phone: p?.emergency_cont_phone || 'Not given either'
          }
        },
        referral:{
          id: rr.id,
          reffering_user_id: usid,
          reffering_facility_id: faci,
          receiving_facility_id: receiving_fac_id,
          reason: rr.reason,
          priority: rr.priority,
          status: rr.status,
          req_date: rr.req_date,
          need_date: rr.need_date,
          from: `${fc.fac_name} (${fc.fac_type})`,
          to: `${f.fac_name} (${f.fac_type})`,
          notes: rr.motes,
          summary: rn.note,
          created_at: rr.created_at,
          updated_At: rr.updated_at

        }
      };



      //send emails to refman patient and ho created ref
      const rfm = await User.findAll({where:{user_role: 'referralmanager', facility_id: faci}});
      const refi = rfm.map(e=> e.email); //not even necessary why did i even map this shi
      

for(i=0; i<rfm.length; i++)
{

refmail = rfm[i].email;
const subj = 'You have a new Referral to approve';

const temp = `<html>
<head><title>New Referral awaits your approval priority <b>${rr.priority}<b> </title></head>
<body>
  <p>Dear ${rfm[i].lname};<p><br>
  <p>${note} </p>
</body>
</html>`;

await genmail(refmail,subj,temp);


}


const patmail = u.email;
const cretmail = user.email;

const ps = 'A referral has been created for you';
const cs = 'You created a referral';
const ptemp = `<html>
<head><title>A new Referral was created for you of priority:<b>${rr.priority}<b> </title></head>
<body>
  <p>Dear ${u.lname};<p><br>
  <p>${note} </p>
  <p>Please await approval by referral manager</p>
</body>
</html>`;

const ctemp = `<html>
<head><title> You created a New Referral. of priority <b>${rr.priority}<b> </title></head>
<body>
  <p>Dear ${user.lname};<p><br>
  <p>${note} </p>
  <p>Please await approval by referral manager</p>
</body>
</html>`;

await genmail(patmail,ps,ptemp);
await genmail(cretmail,cs,ctemp);



      return res.status(201).json({payl});

      





    }
    else if(ns)
    {
      if(!ns.id || !ns.license_number || ns.role !== 'nurse') return res.status(403).json({warn: 'You are not elligible to perform this action'});
      const usid = ns.id;
      const lc = ns.license_number;
      const user = await User.findByPk(usid);
      const nas = await Nurse.findOne({where: {license_number: lc}});
      if(!user) return res.status(403).json({Error: 'Unregistered user cannot perform action'});
      if(!nas) return res.status(401).json({error:' Please submit your nurse details first'});
      if(!user.is_verified) return res.status(403).json({error: 'Please verify email first'});
      if(user.user_role !== 'nurse') return res.status(401).json({error: `user od role ${user.user_role} not allowed to perform this action`});

      const faci = user.facility_id;
      const fc = await Facility.findByPk(faci);
      const req_date = new Date();
      const v = await Visit.findOne({where:{server_id: usid, patient_id: patient_id, facility_id: faci, infacility: true}});
      if(!v) return res.status(422).json({error: 'Cannot Refer patient who has not visited the facility'});
      const visd = v.id;
      
      

      const tr = await Referral.create({
        patient_id,
        reffering_user_id: usid,
        reffering_facility_id: faci,
        receiving_facility_id: receiving_fac_id,
        reason,
        priority,
        status: 'tobeapproved',
        notes,
        req_date,
        need_date,
        visit_id: visd

      });
      if(!tr) throw new Error('Could not create referral');
      const note = `A Referral was created for patient ${u.fname} ${u.lname} from ${fc,fac_name} (${fc.fac_type}) to ${f.fac_name} (${f.fac_type}) by ${user.user_role}: ${user.fname} ${user.lname} for reason: ${reason} and priority: ${priority} at ${req_date}`;
      const rid = tr.id;
      await ReferralNote.create({
        referral_id: rid,
        author_id: usid,
        note
      });

      await Visit.update({referral_id: rid},{where:{server_id: usid, patient_id: patient_id, facility_id: faci, infacility: true}});


      const rr = await Referral.findByPk(rid);
      const rn = await ReferralNote.findOne({where:{referral_id: rid}});
      if(!rr || !rn) return res.status(404).json({error: 'Referral not created and so not found'});

      const payl = {
        message: `Referral created succesfully please await approval by referral manager`,
        creator:{
          userId: user.id,
          name: `${user.fname} ${user.lname}`,
          role: user.user_role,
          verified: user.is_verified,
          facility: `${fc.fac_name} (${fc.fac_type})`,
          email: user.email
        },
        patient:{
          id: p.id,
          name: `${u.fname} ${u.lname}`,
          verified: u.is_verified,
          blood_type: p?.blood_type  || 'Not specifed',
          allergies: p?.allergies || 'No allergies specifed',
          chronic_conditions: p?.chronic_conditions || 'Not given',
          emergency_cont:{
            name: p?.emergency_cont_name || 'Not given',
            phone: p?.emergency_cont_phone || 'Not given either'
          }
        },
        referral:{
          id: rr.id,
          reffering_user_id: usid,
          reffering_facility_id: faci,
          receiving_facility_id: receiving_fac_id,
          reason: rr.reason,
          priority: rr.priority,
          status: rr.status,
          req_date: rr.req_date,
          need_date: rr.need_date,
          from: `${fc.fac_name} (${fc.fac_type})`,
          to: `${f.fac_name} (${f.fac_type})`,
          notes: rr.motes,
          summary: rn.note,
          created_at: rr.created_at,
          updated_At: rr.updated_at

        }
      };
      //send emails to refman patient and ho created ref
      const rfm = await User.findAll({where:{user_role: 'referralmanager', facility_id: faci}});
      const refi = rfm.map(e=> e.email); //not even necessary why did i even map this shi
      

for(i=0; i<rfm.length; i++)
{

refmail = rfm[i].email;
const subj = 'You a new Referral to approve';

const temp = `<html>
<head><title>New Referral awaits your approval priority <b>${rr.priority}<b> </title></head>
<body>
  <p>Dear ${rfm[i].lname};<p><br>
  <p>${note} </p>
</body>
</html>`;

await genmail(refmail,subj,temp);


}


const patmail = u.email;
const cretmail = user.email;

const ps = 'A referral has been created for you';
const cs = 'You created a referral';
const ptemp = `<html>
<head><title>A new Referral was created for you of priority:<b>${rr.priority}<b> </title></head>
<body>
  <p>Dear ${u.lname};<p><br>
  <p>${note} </p>
  <p>Please await approval by referral manager</p>
</body>
</html>`;

const ctemp = `<html>
<head><title> You created a New Referral. of priority <b>${rr.priority}<b> </title></head>
<body>
  <p>Dear ${user.lname};<p><br>
  <p>${note} </p>
  <p>Please await approval by referral manager</p>
</body>
</html>`;

await genmail(patmail,ps,ptemp);
await genmail(cretmail,cs,ctemp);




      return res.status(201).json({payl});



    }

    else if(lb)
    {

      if(!lb.verified) return res.status(401).json({error: 'Please verify labtech or if you have verified try logging in again'});
      const lid = lb.labtId;
      const usid = lb.userId;
      const user = await User.findByPk(usid);
      const lab = await Labtech.findByPk(lid);
      if(!user) return res.status(401).json({error:'Unregistered user cannot perform action'});
      if(!lab) return res.status(403).json({warn:'Please submit your labtech details'});
      if(!user.is_verified) return res.status(403).json({error: 'Please verify email first'});
      if(user.user_role !== 'labtech') return res.status.json(401).json({error: 'Please only labtechs can do this'});

      const faci = user.facility_id;
      const fc = await Facility.findByPk(faci);
      const req_date = new Date();
      const v = await Visit.findOne({where:{server_id: usid, patient_id: patient_id, facility_id: faci, infacility: true}});
      if(!v) return res.status(422).json({error: 'Cannot Refer patient who has not visited the facility'});
      const visd = v.id;
      
      

      const tr = await Referral.create({
        patient_id,
        reffering_user_id: usid,
        reffering_facility_id: faci,
        receiving_facility_id: receiving_fac_id,
        reason,
        priority,
        status: 'tobeapproved',
        notes,
        req_date,
        need_date,
        visit_id: visd

      });
      if(!tr) throw new Error('Could not create referral');
      const note = `A Referral was created for patient ${u.fname} ${u.lname} from ${fc.fac_name} (${fc.fac_type}) to ${f.fac_name} (${f.fac_type}) by ${user.user_role}: ${user.fname} ${user.lname} for reason: ${reason} and priority: ${priority} at ${req_date}`;
      const rid = tr.id;
      await ReferralNote.create({
        referral_id: rid,
        author_id: usid,
        note
      });

      await Visit.update({referral_id: rid},{where:{server_id: usid, patient_id: patient_id, facility_id: faci, infacility: true}});



      const rr = await Referral.findByPk(rid);
      const rn = await ReferralNote.findOne({where:{referral_id: rid}});
      if(!rr || !rn) return res.status(404).json({error: 'Referral not created and so not found'});

      const payl = {
        message: `Referral created succesfully please await approval by referral manager`,
        creator:{
          userId: user.id,
          name: `${user.fname} ${user.lname}`,
          role: user.user_role,
          verified: user.is_verified,
          facility: `${fc.fac_name} (${fc.fac_type})`,
          email: user.email
        },
        patient:{
          id: p.id,
          name: `${u.fname} ${u.lname}`,
          verified: u.is_verified,
          blood_type: p?.blood_type  || 'Not specifed',
          allergies: p?.allergies || 'No allergies specifed',
          chronic_conditions: p?.chronic_conditions || 'Not given',
          emergency_cont:{
            name: p?.emergency_cont_name || 'Not given',
            phone: p?.emergency_cont_phone || 'Not given either'
          }
        },
        referral:{
          id: rr.id,
          reffering_user_id: usid,
          reffering_facility_id: faci,
          receiving_facility_id: receiving_fac_id,
          reason: rr.reason,
          priority: rr.priority,
          status: rr.status,
          req_date: rr.req_date,
          need_date: rr.need_date,
          from: `${fc.fac_name} (${fc.fac_type})`,
          to: `${f.fac_name} (${f.fac_type})`,
          notes: rr.motes,
          summary: rn.note,
          created_at: rr.created_at,
          updated_At: rr.updated_at

        }
      };

      //send emails to refman patient and ho created ref
      const rfm = await User.findAll({where:{user_role: 'referralmanager', facility_id: faci}});
      const refi = rfm.map(e=> e.email); //not even necessary why did i even map this shi
      

for(i=0; i<rfm.length; i++)
{

refmail = rfm[i].email;
const subj = 'You a new Referral to approve';

const temp = `<html>
<head><title>New Referral awaits your approval priority <b>${rr.priority}<b> </title></head>
<body>
  <p>Dear ${rfm[i].lname};<p><br>
  <p>${note} </p>
</body>
</html>`;

await genmail(refmail,subj,temp);


}


const patmail = u.email;
const cretmail = user.email;

const ps = 'A referral has been created for you';
const cs = 'You created a referral';
const ptemp = `<html>
<head><title>A new Referral was created for you of priority:<b>${rr.priority}<b> </title></head>
<body>
  <p>Dear ${u.lname};<p><br>
  <p>${note} </p>
  <p>Please await approval by referral manager</p>
</body>
</html>`;

const ctemp = `<html>
<head><title> You created a New Referral. of priority <b>${rr.priority}<b> </title></head>
<body>
  <p>Dear ${user.lname};<p><br>
  <p>${note} </p>
  <p>Please await approval by referral manager</p>
</body>
</html>`;

await genmail(patmail,ps,ptemp);
await genmail(cretmail,cs,ctemp);



      return res.status(201).json({payl});

    



    }
    else
    {

      return res.status(200).json({warn: 'You did not do a bad thing just seems like you wandered on the wrong side of the road'});


    }


  }



  catch(ku)
  {
    console.log(chalk.red(ku.message));
    return res.status(503).json({error: `Could not create referral at ${new Date()}`});
  }




};


//create visit afuu waki accept referral tna ongeza apo kwa was referred 
//ikiwa hosi tmepokea referral inakua referred patient yes
//wata create afuu waeke ikue referred yes
export const addviz = async(req,res) => {

try{
  const format = {
    patient_id: 1,
    reason: 'Monthly checkup',

  };

  if(!req.body) return res.status(401).json({error: 'Missing request body', format: format});
  const{patient_id,reason} = req.body;
  const ah = req.headers['authorization'];
  if(!ah) return res.status(403).json({error: 'Missing auth token in header'});
  if(!ah.startsWith('Bearer ')) return res.status(401).json({error: 'Invalid token format'});
  if(!patient_id || !reason) return res.status(422).json({error: 'Please enter required fields', format: format});
  if(isNaN(parseInt(patient_id))) return res.status(422).json({error: 'Patient id should be a number', format: format});

  const token = ah.split(" ")[1];
  const decoded = vertok(token);
  //console.log(decoded);
  if(!decoded) return res.status(401).json({error: 'Invalid or expired auth token'});
  const dc = decoded?.id?.doctor;
  const sj = decoded?.id.surgeon;
  const ns = decoded?.id?.nurse;
  const lb = decoded?.id?.labtech;

  const p = await Patient.findByPk(patient_id);
  if(!p) return res.status(401).json({error: 'Patient records not found. please  tell patient to submit patient records'});
  const pu = p.user_id;
  const pus = await User.findByPk(pu);
  if(!pus) return res.status(401).json({error: 'Unregistered user detected'});
  if(!pus.is_verified || pus.user_role !== 'patient' ) return res.status(403).json({advise: 'Pray thee tell, Child does thou patrons knoweth that thy offspring performent such attrocities? the patient is not verified his/her email yet or is not even a patient in the first place  arghh am sick of this shii'});
  
  


  if(dc)
  {
    if(!dc.lic_no || !dc.verified || dc.role !== 'doctor') return res.status(403).json({warn: 'Smuggled token I see'});
    const docid = dc.docid;
    const usid = dc.userId;
    const doc = await Doctor.findByPk(docid);
    const user = await User.findByPk(usid);
    if(!user) return res.status(404).json({error: 'Doctor is not yet registered on afyalink '});
    if(!doc) return res.status(403).json({error: 'Please submit your  doctor details first'});
    if(!user.is_verified || user.user_role !== 'doctor') return res.status(403).json({error:'You are not elligible to perform this action'});
    const myf = user.facility_id;
    const getf = await Facility.findByPk(myf);
    if(!getf || !getf.is_active) return res.status(403).json({error: 'Inactive or ghost facility'});
    const vz1 = await Visit.findOne({where:{patient_id: patient_id, facility_id: myf, server_id: usid, infacility: true}});
    if(vz1) return res.status(403).json({error:'Cannot create visit because user is still at the facility at the moment'})

  const vd = new Date();
    const viz = await Visit.create({
      patient_id,
      facility_id: myf,
      visit_date: vd,
      reason,
      server_id: usid

    });

    if(!viz) throw new Error('Visit not created');
    const vz = await Visit.findOne({where:{server_id: usid, patient_id: patient_id, facility_id: myf,infacility: true}});

    const rp ={
      message: 'Visit created',
      patient:{
        id: patient_id,
        server_id: usid,
        facility: `${getf.fac_name} (${getf.fac_type})`,
        visit_date: vd,
        reason: reason,
        was_referred: vz.was_referred,
        referred_patient: vz.referred_patient,
        created_at: vz.created_at
      }
    };

    return res.status(201).json({rp});

  }
  else if(sj)
  {
    if(!sj.lic_no || !sj.verified) return res.status(403).json({error: 'You are not elligible to perform this action'});
    const sid = sj.surgeonId;
    const usid = sj.userId;
    const diddy = sj.doctorId;
    const saj = await Surgeon.findByPk(sid);
    const user = await User.findByPk(usid);
    const doc = await Doctor.findByPk(diddy);
    if(!user) return res.status(404).json({error: 'Unregistered user cannot perform this action'});
    if(!doc) return res.status(403).json({error: 'Not an elligible surgeon are you? '});
    if(!saj) return res.status(401).json({error: 'Please submit your surgeon details.'});
    if(!user.is_verified || user.user_role !== 'doctor') return res.status(403).json({error: 'User not a surgeon or has not verified email'});
    const myf = user.facility_id;
    const getf = await Facility.findByPk(myf);
    if(!getf || !getf.is_active) return res.status(403).json({error: 'Inactive or ghost facility'});
    const vz1 = await Visit.findOne({where:{patient_id: patient_id, facility_id: myf, server_id: usid, infacility: true}});
    if(vz1) return res.status(403).json({error:'Cannot create visit because user is still at the facility at the moment'})


  const vd = new Date();
    const viz = await Visit.create({
      patient_id,
      facility_id: myf,
      visit_date: vd,
      reason,
      server_id: usid

    });

    if(!viz) throw new Error('Visit not created');
    const vz = await Visit.findOne({where:{server_id: usid, patient_id: patient_id, facility_id: myf, infacility: true}});

    const rp ={
      message: 'Visit created',
      patient:{
        id: patient_id,
        server_id: usid,
        facility: `${getf.fac_name} (${getf.fac_type})`,
        visit_date: vd,
        reason: reason,
        was_referred: vz.was_referred,
        referred_patient: vz.referred_patient,
        created_at: vz.created_at
      }
    };

    return res.status(201).json({rp});







  }
  else if(ns)
  {
    if(!ns.verified || !ns.id || ns.role !== 'nurse' || !ns.license_number) return res.status(401).json({error: 'Where did you get his token from'});    const usid =  ns.id;
    const li = ns.license_number;
    const user = await User.findByPk(usid);
    const nas = await Nurse.findOne({where:{license_number: li}});
    if(!user) return res.status(404).json({error: 'User not found..nurse not registered'});
    if(!nas) return res.status(403).json({error: 'Please submit your nurse details first'});
    if(!user.is_verified || user.user_role !== 'nurse') return res.status(403).json({error: 'Either you should verify email or  are you even a nurse?..'});
    const myf = user.facility_id;
    const getf = await Facility.findByPk(myf);
    if(!getf || !getf.is_active) return res.status(403).json({error: 'Inactive or ghost facility'});
    const vz1 = await Visit.findOne({where:{patient_id: patient_id, facility_id: myf, server_id: usid, infacility: true}});
    if(vz1) return res.status(403).json({error:'Cannot create visit because user is still at the facility at the moment'})


  const vd = new Date();
    const viz = await Visit.create({
      patient_id,
      facility_id: myf,
      visit_date: vd,
      reason,
      server_id: usid

    });

    if(!viz) throw new Error('Visit not created');
    const vz = await Visit.findOne({where:{server_id: usid, patient_id: patient_id, facility_id: myf, visit_date: vd, infacility: true}});

    const rp ={
      message: 'Visit created',
      patient:{
        id: patient_id,
        server_id: usid,
        facility: `${getf.fac_name} (${getf.fac_type})`,
        visit_date: vd,
        reason: reason,
        was_referred: vz.was_referred,
        referred_patient: vz.referred_patient,
        created_at: vz.created_at
      }
    };

    return res.status(201).json({rp});




  }
  else if(lb)
  {

    if(!lb.license_no || !lb.verified || !lb.userId || !lb.labtId) return res.status(403).json({error: 'User not valid to perform this shii'}); 
    const lid = lb.labtId;
    const usid = lb.userId;
    const lab = await Labtech.findByPk(lid);
    const user = await User.findByPk(usid);
    if(!user) return res.status(404).json({error: 'Labtech is not registered on afyalink .'});
    if(!lab) return res.status(403).json({error: 'Please finish submission of labtech details first'});
    if(!user.is_verified || user.user_role !== 'labtech') return res.status(403).json({error: 'Verify email or be a labtech.. tired of ppl like you'});

    const myf = user.facility_id;
    const getf = await Facility.findByPk(myf);
    if(!getf || !getf.is_active) return res.status(403).json({error: 'Inactive or ghost facility'});
    const vz1 = await Visit.findOne({where:{patient_id: patient_id, facility_id: myf, server_id: usid, infacility: true}});
    if(vz1) return res.status(403).json({error:'Cannot create visit because user is still at the facility at the moment'})


  const vd = new Date();
    const viz = await Visit.create({
      patient_id,
      facility_id: myf,
      visit_date: vd,
      reason,
      server_id: usid

    });

    if(!viz) throw new Error('Visit not created');
    const vz = await Visit.findOne({where:{server_id: usid, patient_id: patient_id, facility_id: myf, visit_date: vd, infacility: true}});

    const rp ={
      message: 'Visit created',
      patient:{
        id: patient_id,
        server_id: usid,
        facility: `${getf.fac_name} (${getf.fac_type})`,
        visit_date: vd,
        reason: reason,
        was_referred: vz.was_referred,
        referred_patient: vz.referred_patient,
        created_at: vz.created_at
      }
    };

    return res.status(201).json({rp});





  }

  else{

    return res.status(422).json({error: 'Something went wrong and yes..you are responsible'});


  }



}

catch(blunt)
{
  console.log(chalk.red(blunt.message));
  return res.status(503).json({error: 'Could not create visit'});
  
}





};





//accept or reject referrals send to you refman in
//waki accept update visit was referred yes
//waki reject pia tuma email kwa ref wa uko na wa apa that referral from hii hosi ilikataliwa
//facto ana accept anaeka shced date 
//ikifika  wanatuma email imefika... na inakua inprocess stat
// uko pia wanaambiwa kuna referral in undergo leo at sched time
//pia refman wa facfro na facto
//afuu wanaupdate visit tavle that was referred
//
//doc wa uko aki create visit inakua referred patient yes check timestamp to ensure ni visit ya io day
//sched date ikiwai inakua unachecki prev visit  akiwa  in facility..ya from ukipata unatumia io refid then uko unaeka infacility false
// afuu saa inakua completed status email zitumwe tena 
//after 24hrs past scheduled time referral itakua rejected automatically
// max of 3 refman per fac and i admin and 2 iadmin created at afyalink/init
 


export const acceptref = async(req,res) =>{

try{
  const  fori = {
    refid: 1,
    action: 'accept/reject/complete',
    sched_date: '11/11/2025, 8:26:56 PM'

  };

  if(!req.body) return res.status(400).json({error: 'Missing request body', format: fori});
  const{refid,action,sched_date} = req.body;
  const ah = req.headers['authorization'];
  if(!ah) return res.status(401).json({error: 'Missing auth roken in header'});
  if(!ah.startsWith("Bearer ")) return res.status(401).json({error: 'Invalid auth token.. ', format: 'Bearer <toke>'});
  if(!refid || !action) return res.status(422).json({error: 'Missing some required fields', format: fori});
  const token = ah.split(" ")[1];
  const decoded = vertok(token);
  const rfm = decoded?.id?.refmanager;
  if(!decoded) return res.status(401).json({error: 'Invalid or expired auth token..please login again for a fresh one'});
  if(!rfm) return res.status(403).json({error: 'Invalid auth token probably smuggled too'});
  if(!rfm.verified || rfm.role !== 'refmanager') return res.status(403).json({error: 'Something fishy is going on here..leave'});
  const usid = rfm.id;
  const user = await User.findByPk(usid);
  if(!user) return res.status(404).json({error: 'Only registered Refmanagers can do this shii'});
  if(!user.is_verified) return res.status(401).json({error:'Please verify your email first'});
  if(user.user_role !== 'refmanager') return res.status(403).json({error: `user of role ${user.user_role} cannot perform this action`});
  if(user.email !== rfm.email) return res.status(403).json({error: 'Please be credible of your actions '});
  const faci = user.facility_id;
  const fac = await Facility.findByPk(faci);
  const ref = await Referral.findByPk(refid);
  if(!ref) return res.status(403).json({error: 'No referral with that id'});
  const patid = ref.patient_id;
  const refto = ref.receiving_facility_id;
  const refro = ref.referring_facility_id;
  const pat = await Patient.findByPk(patid);
  const refi = ref.reffering_user_id;
  const rer = await User.findByPk(refi);
  if(!rer) return res.status(403).json({error: 'User who made the referral is not registered on afyalink'});
  const refaci = rer.facility_id;
  const refac = await Facility.findByPk(refaci);
  if(!refac || !refac.is_active)  return res.status(403).json({error: `${rer.user_role} who made the referral is from a ghost facility`});
  const alld = ['doctor','nurse','labtech'];
  const utr = ref.user_role;
  if(!alld.includes(utr)) return res.status(403).json({error: `Invalid referral because it was created by user of role ${utr}`});
  if(!pat) return res.status(404).json({error: 'The patient being referred has not yet completed submiting details'});
  const ptu = pat.user_id;
  const pus = await User.findByPk(ptu);
  if(!pus) return res.status(403).json({error: 'Patient is not a registered  user on afyalink'});
  const facto = await Facility.findByPk(refto);
  if(!facto  || !facfro.is_active) return res.status(403).json({error: 'The facility this referral is to is a ghost facility'});
  const facfro = await Facility.findByPk(refro);
  if(!facfro || !facfro.is_active) return res.status(403).json({error: 'This referral is from a ghost facility'});
  if(!refid) return res.status(404).json({error: 'No such referral found'});
  if(!fac || !fac.is_active) return res.status(403).json({error: 'Users from ghost facilities are not allowed to perform this action'});

  if(action === 'accept')
  {
    if(!sched_date) return res.status(422).json({error: 'Please insert missing fields', format: fori});
    const rez = await Referral.findByPk(refid);
    if(user.facility_id !== refto) return res.status(403).json({error: `Only the referral managers at ${facto.fac_name} (${facto.fac_type}) can perform this action`});
    const dt = new Date().toLocaleString();
    
    if(dt > sched_date) return res.status(422).json({error: `Invalid scheduled date ${sched_date}`});
    await Referral.update({
      status: 'accepted',
      sched_date,
     },{where:{id:refid}});

     await Visit.update({ was_referred: true},{where:{server_id:refi, patient_id: patid, facility_id: refro,infacility: true }});
     //send mail to patient and refmans at facfro and facto that we accpeted on date
     const n = await ReferralNote.findOne({where:{referral_id: refid}});

     const manfro = await User.findAll({where:{user_role: 'refmanager', facility_id: refro, is_verified: true}});
     const manto = await User.findAll({where:{user_role: 'refmanager',facility_id: refto, is_verified: true}});

     const email = user.email;
     

     const subj = `You accepted a Referral request  from  ${facfro.fac_name} (${facfro.fac_type})`;
     const tmp = `<html>
     <head><title>${user.fname} ${user.lname} has accepted a referral from ${facfro.fac_name} (${facfro.fac_type})  scheduled on ${sched_date} </title></head>
     <body><p> ${n?.note || 'No info'} </p> 
     <P> <b>Scheduled on: ${sched_date} </p>
   </body>
     </html>`;

await genmail(email,subj,tmp);

     for(i=0;i<manfro.length; i++)
     {
      const email = manfro[i].email;
      const subj = `Referral request accepted at ${facto.fac_name} (${facto.fac_type})`;
      const tmp = `<html>
      <head><title>${facto.fac_name} (${facto.fac_type}) has accepted your referral scheduled on ${sched_date} </title></head>
      <body><p> ${n?.note || 'No info'} </p> 
      <P> <b>Scheduled on: ${sched_date} </p>
    </body>
      </html>`;
      await genmail(email,subj,tmp);
     }


     for(i=0;i<manto.length; i++)
     {
      const email = manto[i].email;
      if(email !== user.email)
      {
        const subj = `Referral request  from  ${facfro.fac_name} (${facfro.fac_type}) has been accepted`;
      const tmp = `<html>
      <head><title>${user.lname} (${user.fname}) has accepted a referral  scheduled on ${sched_date} </title></head>
      <body><p> ${n?.note || 'No info'} </p> 
      <P> <b>Scheduled on: ${sched_date} </p>
    </body>
      </html>`;
      await genmail(email,subj,tmp);

      }
     }


     const retpay = {
      message: `Referral accepted `,
      ref:{
        more: n?.note || 'Nothing much',
        scheduled: sched_date,
        accepted: rez.updated_at
      }
     };

     return res.status(201).json({retpay});










  }

  else if (action === 'reject')
  {
    const rez = await Referral.findByPk(refid);
    if(user.facility_id !== refto) return res.status({error: `only the referral managers at ${facto.fac_name} (${facto.fac_type}) can perform this action `});
    await Referral.update({ status: 'rejected'},{where:{id:refid}});

    const n = await ReferralNote.findOne({where:{referral_id: refid}});

     const manfro = await User.findAll({where:{user_role: 'refmanager', facility_id: refro, is_verified: true}});
     const manto = await User.findAll({where:{user_role: 'refmanager',facility_id: refto, is_verified: true}});

     const email = user.email;
     

     const subj = `You Rejected  a Referral request  from  ${facfro.fac_name} (${facfro.fac_type})`;
     const tmp = `<html>
     <head><title>${user.fname} ${user.lname} has rejected  a referral from ${facfro.fac_name} (${facfro.fac_type})  scheduled on ${sched_date} </title></head>
     <body><p> ${n?.note || 'No info'} </p> 
     <P> <b>Rejected  on: ${new Date()} </p>
   </body>
     </html>`;

await genmail(email,subj,tmp);

     for(i=0;i<manfro.length; i++)
     {
      const email = manfro[i].email;
      const subj = `Referral request Rejected at ${facto.fac_name} (${facto.fac_type})`;
      const tmp = `<html>
      <head><title>${facto.fac_name} (${facto.fac_type}) has rejected your referral scheduled on ${sched_date} </title></head>
      <body><p> ${n?.note || 'No info'} </p> 
      <P> <b>Rejected on: ${new Date()} </p>
    </body>
      </html>`;
      await genmail(email,subj,tmp);
     }


     for(i=0;i<manto.length; i++)
     {
      const email = manto[i].email;
      if(email !== user.email)
      {
        const subj = `Referral request  from  ${facfro.fac_name} (${facfro.fac_type}) has been rejected`;
      const tmp = `<html>
      <head><title>${user.lname} (${user.fname}) has rejected a referral  scheduled on ${sched_date} </title></head>
      <body><p> ${n?.note || 'No info'} </p> 
      <P> <b>Rejected on: ${new Date()} </p>
    </body>
      </html>`;
      await genmail(email,subj,tmp);

      }
     }


     const retpay = {
      message: `Referral rejected `,
      ref:{
        more: n?.note || 'Nothing much',
        scheduled: sched_date,
        accepted: rez.updated_at
      }
     };

     return res.status(201).json({retpay});








  }




















}

catch(ukedi)
{

  console.log(chalk.red(ukedi.message));
  return res.status(503).json({error: 'Could not make referral changes'});
}


}




