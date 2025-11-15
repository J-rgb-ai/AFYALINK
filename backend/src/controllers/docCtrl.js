/**
 * hii ndo docctrl ya /doctors
 * na naything to do nayo iko apa 
 * users aneza angalia doctors but limited info
 * doctor aneza jiangalia na update his profile //later be added
 * doctor aneza ona referral ako nazo
 * 
 * acha nmalize refman kwanza
 * 


/doctor/add only user mwenye role ni doctor anakuja apa anaadd extra details na alafu anakua added kwa doc table
only verified useers pek yao
token ni from signin
taongeza kaa ako kwa doc table apewe diff docttoken

 */

//import User from "../config/db/orm/ormmodels/user.js";
//import Doctor from "../config/db/orm/ormmodels/doctors.js";
import vertok from "../utils/jwt/verjwt.js";
import { decode } from "jsonwebtoken";
import gentok from "../utils/jwt/genjwt.js";
import { genmail } from "../utils/mail/mailer.js";
//import Referral from "../config/db/orm/ormmodels/referrals.js";
//import Patient from "../config/db/orm/ormmodels/patients.js";
//import ReferralNote from '../config/db/orm/ormmodels/refnotes.js';
//import Facility from "../config/db/orm/ormmodels/facility.js";

import models from "../config/db/orm/sequalize.js";

const{User,Doctor,Referral,Patient,ReferralNote,Facility} = models;

//addoc details   

///token from aadoc should be a same for a verified doctor and be used all over the doct routes
//use token from login

export const addoc = async(req,res) =>{
try{

    if(!req.body) return res.status(401).json({error:'Missing request body'});

    const {license_number,is_specialist,speciality,qualification,years_experience,is_consultant} = req.body;

    const ah = req.headers['authorization'];
    if(!ah) return res.status(403).json({error:'Missing auth token'});
    if(!ah.startsWith('Bearer ')) return res.status(403).json({error: 'Invalid token format'});
    if(!license_number || !years_experience || !qualification ) return res.status(403).json({error:'Please fill in the required fields'});
    if(is_specialist && !speciality) return res.status(403).json({error:'Please specify a speciality'});
    const token = ah.split(" ")[1];
    const decoded = vertok(token);
    if(!decoded) return res.status(401).json({error:'Invalid or expired token'});
    const user_id = decoded.id;
    const email = decoded.email;
    const confd = await Doctor.findOne({where:{userId}});
    if(confd) return res.status(200).json({error:'Seems like this doctor has already been verified'});
    const cond = await User.findByPk(user_id);
    //if(cond.user_role !== 'doctor') return res.status(403).json({error:'Only doctors can perform this action'});
    if(!cond) return res.status(404).json({error: 'User not found'});
    if(cond.email !== email) return res.status(401).json({error:"Smuggled token you got there"});
    if(!cond.is_verified) return res.status(403).json({error:"please verify user first"});
    if(cond.user_role !== 'doctor') return res.status(403).json({error:"User not eligible for doctor status"});
    
    const nd = await Doctor.create ({
        user_id,
        license_number,
        is_specialist,
        speciality,
        qualification,
        years_experience,
        is_consultant

    });

    const docp = {
        message:`welcome doctor ${cond.fname}`,
        doctor:{
        name: `${cond.fname} ${cond.lname}`,
        docid: nd.id,
        userId: cond.id,
        age:cond.age,
        lic_no: nd.license_number,
        is_spec: nd.is_specialist,  //do some corrections here later to avoid undefined
        spec: nd.speciality,
        qualf: nd.qualification,
        role: cond.user_role,
        verified: cond.is_verified,
        experience: nd.years_experience,
        consultant: nd.is_consultant,
        created: cond.created_at,
        doc_since: nd.created_at,

        }
 };

 const doctok = 'Bearer ' + gentok(docp);

 res.status(201).json({
    docp,
    doctor_token:doctok
 });

 //semd email that he now reg a s a doctor

 const subj = "Doctor registration";

 const template = `<html>
 <head>
    <titile>
        You are now a doctor at afyalink</title>
</head>
<body>
    <p>Dear Doc. ${cond.fname};</p><br>
    <p>You have been approved as a doctor at afyalink and can now work accordinly</p><br>
    <p class="value"><span class="label">Name: </span> ${cond.fname} ${cond.lname}</p>
    <p class="value"><span class="label">Licesne no: </span> ${license_number}</p>
    <p class="value"><span class="label">Experience: </span> ${years_experience}</p>
    <p class="value"><span class="label">Qualification: </span> ${qualification}</p>
    <p class="value"><span class="label">Speciality: </span> ${speciality}</p>
    <p class="value"><span class="label">Joined at:</span> ${nd.created_at}</p>

</body>

 </html>`;

 await genmail(email,subj,template);


}


catch(err)
{

    console.log(err.message);
    res.status(401).json({error:'Could not register doctor .please try again later'});

}


};


//doc dashboard

export const docdash = async(req,res) =>
{
    try{
        const ah = req.headers['authorization'];
        if(!ah) return res.status(401).json({error:'Missing auth token'});
        if(!ah.startsWith("Bearer ")) return res.status(403).json({error:'Invalid token format'});
        const token = ah.split(" ")[1];
        const decoded = vertok(token);
        //console.log(token);
        if(!decoded) return res.status(401).json({error: 'Invalid or expired token'});
        const dc = decoded?.id?.doctor;
       // console.log(decoded);
        if(!dc || !dc.verified || dc.role !== 'doctor') return res.status(403).json({error:'Did you smuggle this token?'});
        const docid = dc.docid;
        const usid = dc.userId;
        //todo create appointments table

        const cond = await Doctor.findByPk(docid);
        if(!cond) return res.status(404).json({error: 'Doctor not found'});
        const conu = await User.findByPk(usid);
        if(!conu) return res.status(404).json({error:'User not found'});

        const docp = {
            message:`welcome doctor ${conu.fname}`,
            doctor:{
            name: `${conu.fname} ${conu.lname}`,
            docid: cond.id,
            userId: conu.id,
            age:conu.age,
            lic_no: cond.license_number,
            is_spec: cond.is_specialist,
            spec: cond.speciality,
            qualf: cond.qualification,
            role: conu.user_role,
            verified: conu.is_verified,
            experience: cond.years_experience,
            consultant: cond.is_consultant,
            created: conu.created_at,
            doc_since: cond.created_at,
    
            }};


            //console.log(docp);


        const getr = await Referral.findOne({where:{reffering_user_id:docid}});
        const getp = await Patient.findAll({attributes:{exclude:['password_hash']}});
        const faci = await Facility.findAll();
        //console.log('r    '+getr);
        if(!getr) return res.status(200).json({docp, patients:{getp}, facilities: {faci},Referrals:`Seems like you have no referrals Doctor ${conu.fname}`});

        console.log('apa');
        const getrn = await ReferralNote.findOne({where:{author_id:usid}});
        console.log('na apa');
        console.log( 'rn ' +getrn);
       // if(!getrn) return `No referral notes by Dr ${conu.fname}`;

        const patid = getr.patient_id;
        const pat = await Patient.findByPk(patid);
        if(!pat) return res.status(404).json({error:'Patient not found'});
        const refusid = pat.user_id;
        const getrefu = await User.findByPk(refusid);
        if(!getrefu) return res.status(404).json({error:'Patient is no longer a user'});


        
       


        const acrefs = await Referral.findAll({
            where: { reffering_user_id: docid },
            include: [
              {
                model: Patient,
                as: 'ref_patient',
                include: [
                  {
                    model: User,
                    as: 'user_patient',
                    attributes: ['fname', 'lname', 'email', 'phone', 'gender', 'age']
                  }
                ]
              },
              {
                model: ReferralNote,
                as: 'summary',
                required: false
              },
              {
                model: Facility,
                as: 'facfro'
              },
              {
                model: Facility,
                as: 'facto'
              }
            ]
          });


          const refpay1 = acrefs.map(ref => ({
            patient_name: `${ref.ref_patient.user.fname} ${ref.ref_patient.user.lname}`,
            contact: {
              email: ref.ref_patient.user_patient.email,
              phone: ref.ref_patient.user_patient.phone,
              gender: ref.ref_patient.user_patient.gender,
              age: ref.ref_patient.user_patient.age,
              emergency_person: ref.ref_patient.emergency_cont_name,
              emergency_phone: ref.ref_patient.emergency_cont_phone
            },
            medical_info: {
              blood_type: ref.ref_patient.blood_type,
              allergies: ref.ref_patient.allergies,
              chronic_conditions: ref.ref_patient.chronic_conditions,
              insured: ref.ref_patient.is_insured,
              insurance_type: ref.ref_patient.insurance_type
            },
            referral_details: {
              priority: ref.priority,
              reason: ref.reason,
              status: ref.status,
              referred_on: ref.created_at,
              from: ref.facfro?.fac_name,
              referring_type: ref.facfro?.fac_type,
              to: ref.facto?.fac_name,
              receiving_type: ref.facto?.fac_type
            },
            notes: ref.summary?.map(note => ({
              notes: note.note,
              noted_at: note.created_at
            }))
          }));
          
          




        

       
        const refpay = 'here';

        res.status(200).json({
            docp,
            patients:{ getp},
            facilities:{faci},
            refpay1
        });

    }
    catch(err)
    {

        console.error(err.message);
        res.status(500).json({error:'Could not fetch doctor details'});




    }






    
};




//create referral....

//doc created referrals and then they will be approved by admin
//add enum created and approved on reftable

export const addref = async(req,res) =>{

try{

    if(!req.body) return res.status(403).json({error:'Missing request body'});

    const {patid,refacid,reason,priority,notes} = req.body;

    if(!patid || !refacid || !reason) return res.status(403).json({error:'Please fill in required fields'});
    const ah = req.headers['authorization'];
    if(!ah) return res.status(401).json({error:'Missing auth token'});
    if(!ah.startsWith("Bearer ")) return res.status(403).json({error:'Invalid token format'});
    const token = ah.split(" ")[1];
    const decoded = vertok(token);
    console.log(decoded);
    if(!decoded) return res.status(403).json({error:'Invalid token format'});
    const dc = decoded?.id?.doctor;

    if(!dc || !dc.verified || dc.role !== 'doctor') return res.status(403).json({error:'Looks like a smuggled token buddy'});
    const pe = await Patient.findByPk(patid);
    if(!pe) return res.status(401).json({error:'Patient not found'});
    const usi = pe.user_id;
    const pus = await User.findByPk(usi);
    if(!pus) return res.status(404).json({error:'Patient is no longer a user'});
    const dus = dc.id;
    const dcs = dc.docid;
    const getdc = await Doctor.findByPk(dcs);
    const getd = await User.findByPk(dus);
    if(!getd || !getdc || !getd.is_verified) return res.status(403).json({error:'You are not a valid doctor'});
    const sfi = getd.facility_id;
    const rcf = await Facility.findByPk(refacid);
    if(!rcf || !rcf.is_active) return res.status(403).json({error:'Invalid or inactive facility...please select another one'});
    const sf = await Facility.findByPk(sfi);
    if(!sf ) return res.status(401).json({error:'The facility does not exist'});


    const ar = await Referral.create({
        patient_id: patid,
        reffering_user_id: dus,
        reffering_facility_id: sf,
        receiving_facility_id: rcf,
        reason,
        priority,
        notes
    });

    const reeno = `A  Referral was created for ${pus.fname} ${pus.lname}. by Doc ${getd.fname} ${getd.lname}, of priority ${priority} from ${sf.fac_name} to ${rcf.fac_name} of reason ${reason} on ${ar.created_at}`;

    const arn = await ReferralNote.create({
        referral_id: ar.id,
        author_id: dus,
        note: reeno
    });



    res.status(201).json({
        message: 'Refeffal created succesfully awaiting Referral manager approval',
        Referral:{
            Patient:`${pus.fname} ${pus.lname}`,
            created_by:`Dr. ${getd.fname} ${getd.lname}`,
            from:sf.fac_name,
            type: sf.fac_type,
            to: rcf.fac_name,
            of_type: rcf.fac_type,
            priority:ar.priority,
            reason: ar.reason,
            notes:ar.notes,
            created: ar.created_at,
            summary:arn,

        }
    });



    //send to patient that a ref has been created for him/her

    const email = pus.email;
    const sub = 'A referral has been created for you';

    const temp = `<html>
    <head><title> A referral has been created for you and is awaiting processing</title></head>
    <body>
        <p>Dear ${pus.fname};</p><br>
        <p>A referral has been created for you from ${sf.fac_name} to ${rcf.fac_name} due to ${ar.reason} </p>
        <p>Please await processing and approval by referral manager </p>
        <p>Once approved you will be notifed by email </P>
</body>

    </html>`;


await genmail(email,sub,temp);




}

catch(err){

    console.log(err.message);
    res.status(500).json({error:'Could not create referral at the moment'});





}




};










