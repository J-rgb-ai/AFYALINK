import Labtech from "../config/db/orm/ormmodels/labtechs.js";
import LabResult from "../config/db/orm/ormmodels/labres.js";
import { format } from "morgan";
import vertok from "../utils/jwt/verjwt.js";
import User from "../config/db/orm/ormmodels/user.js";
import Blocked from '../config/db/orm/ormmodels/blockip.js';
import Facility from "../config/db/orm/ormmodels/facility.js";
import { genmail } from "../utils/mail/mailer.js";
import gentok from "../utils/jwt/genjwt.js";
import { loadESLint } from "eslint";
import Patient from "../config/db/orm/ormmodels/patients.js";
import { where } from "sequelize";
import Referral from "../config/db/orm/ormmodels/referrals.js";






export const addt = async (req,res) =>{

try{

    const form = {
        
        license_no: "LAB-KE-2025-0098",
        qualification: "BSc Medical lab",
        speciality: "Microbiology",
        years_experience: 5
      };
      

    if(!req.body) return res.status(404).json({error: 'Missing request body..', format: form});
    const{license_no,qualification,speciality,years_experience} = req.body;
    const ah =  req.headers['authorization'];
    if(!license_no || !qualification || !speciality || !years_experience) return res.status(403).json({error: 'Missing fields',format:form});
    if(!ah) return res.status(401).json({error:'Missing auth header'});
    if(!ah.startsWith('Bearer ')) return res.status(403).json({error:'Invalido tokeno formate'});
    const token = ah.split(" ")[1];
    const decoded = vertok(token);
    if(!decoded || decoded.id) return res.status(403).json({error:'Invalid or expired auth token'});
    const usid = decoded.id;
    const email = decoded.email;
    const user = await User.findByPk(usid);
    if(!user) return res.status(403).json({error: 'Non-registered user detetced'});
    const dem = user.email;
    const role = user.user_role;
    const faci = user.facility_id;
    if(email !== dem) return res.status(403).json({error:'Smuggled token detected'});
    if(role !== 'labtech') return res.status(403).json({warn: 'User is not a labtech'});
    if(!user.is_verified) return res.status(403).json({error:'Please verify email first'});
    await Labtech.create({
        license_no,
        user_id: usid,
        qualification,
        speciality,
        years_experience
    });

    const lb = await Labtech.findOne({where:{license_no:license_no}});
    const fac = Facility.findByPk(faci);
    if(!lb) return res.status(503).json({error: 'Unsuccesful in updating labtech details'});

    const labtp = {
        message: `Welcome Labtech ${user.fname} ${user.lname}`,
        labtech:{
            userId: user.id,
            labtId: lb.id,
            name: user.fname + ' ' + user.lname,
            verified: user.is_verified,
            license_no: lb.license_no,
            speciality: lb?.speciality || 'None',
            years_experience: lb.years_experience,
            facility: `${fac?.fac_name || 'Unknown'}  (${fac?.fac_type || ' also Unknown '})`,
            submitted: lb.created_at
        }
    };

    const labt = 'Bearer ' + gentok(labtp);





    //send email 

    const subj = 'You are now a  labtech at Afyalink';
const tmp = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Welcome Labtech</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      color: #333;
      padding: 20px;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 30px;
      max-width: 600px;
      margin: auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
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
      margin-top: 30px;
      font-size: 0.9em;
      color: #888;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Welcome Labtech {{name}}</h2>
    <p>We're excited to have you join the AfyaLink network. Below are your registration details:</p>

    <div class="value"><span class="label">Name:</span>${labtp.name}</div>
    <div class="value"><span class="label">Verified:</span> ${labtp.verified}</div>
    <div class="value"><span class="label">License No:</span> ${labtp.license_no}</div>
    <div class="value"><span class="label">Speciality:</span> ${labtp.speciality}</div>
    <div class="value"><span class="label">Years of Experience:</span> ${labtp.years_experience}</div>
    <div class="value"><span class="label">Facility:</span> ${labtp.facility}</div>
    <div class="value"><span class="label">Submitted On:</span> ${labtp.submitted}</div>

    <p>If any of the above information is incorrect, please contact your administrator immediately.</p>

    <div class="footer">
      &copy; ${new Date().getFullYear()} AfyaLink. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

await genmail(email,subj,tmp);




   return  res.status(201).json({labtp, labtech_tok: labt});




}
catch(err){



    console.log(err.message);
    res.status(500).json({error:'Could not submit Labtech details', definition: err.message});
}



};



//auth from login or submission of details as labtech


export const labtdah = async(req,res) =>{

try{

    if(!ah) return res.status(401).json({error: 'No auth header'});
    const ah = req.headers['authorization'];
    if(!ah.startsWith('Bearer ')) return res.status(401).json({error: 'Invalid token format'});
    const token = ah.split(" ")[1];
    const decoded = vertok(token);
    
    if(!decoded) return res.status(401).json({error: 'Invalid token format'});

    const lt = decoded?.id?.labtech;
    if(!lt || !lt.verified || lt.license_no || !lt.userId || lt.labtId) return res.status(403).json({warn: 'Unauthorized action detected in token'});
    const usid = lt.userId;
    const libd = lt.labtId;
    const user = await User.findByPk(usid);
    if(!user) return res.status(404).json({error:'User is not registered on afyalink'});
    if(user.user_role !== 'labtech') return res.status(403).json({warn: 'You are not elligible to be herer', role: `${user.user_role}`});
    const laber = await Labtech.findByPk(libd);
    if(!laber) return res.status(403).json({error: ' Please submit your labtech details first'});
    const fid = user.facility_id;
    const pr = 'patient';
    const ref = await Referral.findAll({where:{reffering_user_id:usid}});
    const faa = await Facility.findAll();
    const fac = await Facility.findByPk(fid); //ki aaray ikubwa tu
    const patr = await User.findall({
        where: {user_role: pr},
    
        include:[
            {
                model: Patient,
                as: 'user'
            },{
                model: Facility,
                as: 'facility'
            }
        ]
    });

    const patp = patr.map(p=>({
        patient :{
            id: p.id,
            name: `${p.fname} ${p.lname}`,
            blood_type: p.user.blood_type,
            allergies: p.user.allergies,
            chronic_conditions: p?.user?.chronic_conditions || 'None',
            emergency_cont_name: p?.user?.emergency_cont_name || 'Not given',
            emergency_cont_phone: p?.user.emergency_cont_phone || 'Not given',
            is_insured: p?.user.is_insured || 'Nope',
            insurance_type: p?.user?.insurance_type || 'Not insured',
            facility: `${p.facility.fac_name} (${p.facility.fac_type})`
        }



    }

    ));








    const labp = {
        message: `Welcome ${user.fname} ${user.lname}`,
        labtech:{
            userId: user.id,
            labtId: laber.id,
            name: user.fname + ' ' + user.lname,
            verified: user.is_verified,
            license_no: laber.license_no,
            speciality: laber?.speciality || 'None',
            years_experience: laber.years_experience,
            facility: `${fac?.fac_name || 'Unknown'}  (${fac?.fac_type || ' also Unknown '})`,
            submitted: laber.created_at

        }
    };


    if(!ref) return res.status(200).json({labp,patp, facilities: {faa}});

    const acrefs = await Referral.findAll({
      where: {reffering_user_id: usid},
      include:[
          {
              model: Patient,
              as: 'patient',
              include:[
                  {
                      model: User,
                      as: 'user',
                      attributes: ['fname','lname','email','phone','gender','ager']
                  }
              ]
          },
          {
              model: ReferralNote,
              as: 'referral_notes',
              required: false
          },
          {
              model: Facility,
              as: 'facilityfrom'
          },
          {
              model: Facility,
              as: 'facilityto'
          }

      ]
      
} );


const refpay2 = acrefs.map(ref=>({
  patient_name: `${ref.patient.user.fname} ${ref.patient.user.lname}`,
  contact: {
      email: ref.patient.user.email,
      phone: ref.patient.user.phone,
      gender: ref.patient.user.gender,
      age: ref.patient.user.age
  },
  medical_info: {
      blood_type: ref?.patient?.blood_type || 'Not specified',
      allergies: ref?.patient?.allergies || 'None',
      chronic_conditions: ref?.patient?.chronic_conditions || 'None',
      insured: ref?.patient?.is_insured || 'Not insured',
      insurance_type: ref?.patient?.insurance_type || 'Not insured' 
  },
  referral_details:{
      priority: ref.priority,
      reason: ref.reason,
      status: ref.status,
      referred_on: ref.updated_at,
      from: ref.facilityfrom.fac_name,
      referring_type: ref.facilityfrom.fac_type,
      to: ref.facilityto.fac_name,
      receiving_type: ref.facilityto.fac_type
  },
  notes: ref.referral_notes?.map(note=>({
      notes: note.note,
      noted_at: note.created_at
  }))

}));



res.status(200).json({labp,patp,refpay2, facilities:{faa}});




}

catch(w)
{

    console.log(w.message);
    res.status(503).json({error:'Could not get labtech details...', debug: w.message});

}





};


//block ip ..ublock ip // only admins and iadmins should do this shii

export const blockip = async(req,res) =>{


  try{

    const ipRegex = /^(?:\d{1,3}\.){3}\d{1,3}$|^(?:[a-fA-F0-9]{1,4}:){1,7}[a-fA-F0-9]{1,4}$|^::(?:[a-fA-F0-9]{1,4}:){0,5}[a-fA-F0-9]{1,4}$/;


  const formi = {
    ip: '127.0.0.1',
    block: 'yes/no',
    reason: 'Request forgery as referral manager'
  };

  //todo regex for ip
  if(!req.body) return res.status(401).json({error: 'Missing request body', format: formi});
  const {ip,block,reason} = req.body;
  const vp = ipRegex.test(ip);
  if(!vp) return res.status(422).json({error: `${ip} is not a valid ip `});
  if(!ip || !block ) return res.status(401).json({error: 'Please input required fields', format: formi});
  if(!(block === 'yes' || block === 'no')) return res.status(403).json({roast: `Cant you read lil nigga.. block can only be yes/no and not ${block}`});
  const ah = req.headers['authorization'];
  if(!ah) return res.status(403).json({error: 'Please ensure auth token is included in authorization header'});
  if(!ah.startsWith('Bearer ')) return res.status(401).json({error: 'Auth token must begin with Bearer <token> '});
  const token = ah.split(" ")[1];
  const decoded = vertok(token);
  if(!decoded) return res.status(401).json({error: 'Invalid or expired token'});
  const adm = decoded?.id?.admin;
  if(!adm || !adm.email || !adm.id || !adm.verified || !(adm.role === 'admin' || adm.role === 'iadmin')) return res.status(403).json({error: 'Action not permitted by authority due to insufficient priviledges'});
  const usid = adm.id;
  const mail = adm.email;
  const user = await User.findByPk(usid);
  if(!user) return res.status(404).json({warn: 'Unregistered user cannot perform this action'});
  if(!user.is_verified || user.email !== mail || !(user.user_role === 'admin' || user.user_role === 'iadmin') ) return res.status(401).json({warn: `Smuggled token here..please get a legitimate one  ${user.user_role}:  ${user.fname} ${user.lname}`});


if(block === 'yes')

  {
    const bl = await Blocked.findOne({where: ip});
    if(!bl){
      await Blocked.create({
        ip,
        blocked: true,
        time: new Date().toLocaleString(),
        reason: reason || 'I just hate this nigga',
        blocked_by: usid
      });

      return res.status(201).json({success: `${ip} has been blocked by ${user.user_role}: ${user.fname} ${user.lname} at ${new Date().toLocaleString()}`});

    }

    if(bl.blocked) return res.status(301).json({info: `${ip} had already been blocked at ${bl.time}`});
    const ti = new Date().toLocaleString();

    await Blocked.update({blocked: true, time: ti, blocked_by: usid},{where:{ip}}); //no need kueka mail coz middle ware gonna handle that shii

  }

else if(block === 'no')
{

  const bl = await Blocked.findOne({where:ip});
  if(!bl) return res.status(401).json({error: ` Sorry ${user.user_role}: ${user.fname} ${user.lname},  ${ip} is not a blocked ip..`});

  if(bl){

    const ti = new Date().toLocaleString();

    await Blocked.update({blocked: false, time:ti, blocked_by: usid },{where:{ip}});
    return res.status(200).json({success: `${ip} unblocked by ${user.user_role}: ${user.fname} ${user.lname}  at ${ti}`});

  }


}}



catch(dih){

console.log(dih.message);

return res.status(501).json({error: 'Could not do that shii you asked earlier'});




}


};




