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







//dashboard  ya ref man

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
          }
        ],
        order: [['created_at', 'DESC']]
      });


      const refdash = referrals.map(ref => ({
        referral_id: ref.id,
        status: ref.status,
        priority: ref.priority,
        reason: ref.reason,
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

export const approveref1 = async(req,res) =>{

try{

    if(!req.body) return res.status(404).json({error:'Missing request body'});
    const {refid,approve} = req.body;

    const ah = req.headers['authorization'];
    if(!ah) return res.status(401).json({error:'missing auth token'});
    if(!ah.startsWith("Bearer ")) return res.status(401).json({error:'Invalid token format'});
    if(!refid || approve) return res.status(401).json({error:'Please specify referral id and approve action'});
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
    <p>You’ve been referred by Dr. <strong>${refu.fname} ${refu.lname}</strong> (${refu.user_role}) at <strong>${facfro.fac_name}</strong>.</p>

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

    <p>Please log in to your patient dashboard to view full details and next steps.</p>

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
    <p>Dear <strong>${patu.fname}</strong>,</p>
    <p> <strong>${refu.fname} ${refu.lname}</strong> (${refu.user_role}) at <strong>${facfro.fac_name}</strong>.</p>

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

    <p>Please log in to your doctor dashboard to view full details.</p>

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
    <p>Dear <strong>${patu.fname}</strong>,</p>
    <p>You approved a Referral by Dr. <strong>${refu.fname} ${refu.lname}</strong> (${refu.user_role}) at <strong>${facfro.fac_name}</strong>.</p>

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
    <p>You’ve been referred by Dr. <strong>${refu.fname} ${refu.lname}</strong> (${refu.user_role}) at <strong>${facfro.fac_name}</strong>.</p>

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

    <p>Please log in to your patient dashboard to view full details and next steps.</p>

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
    <p>Dear <strong>${patu.fname}</strong>,</p>
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

    <p>Please log in to your doctor dashboard to view full details.</p>

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
    <p>Dear <strong>${patu.fname}</strong>,</p>
    <p>You approved a Referral by Dr. <strong>${refu.fname} ${refu.lname}</strong> (${refu.user_role}) at <strong>${facfro.fac_name}</strong>.</p>

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


