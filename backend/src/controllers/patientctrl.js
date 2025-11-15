//patient ctrl here....



//verify further patient detalis



//token  signin to be used here

///only those who have verified their emails can submit their info ere
//what if tuongeze ka req.body field kwa pat aki sign in ndo i allowa di msee si pat akue pat

//import Patient from "../config/db/orm/ormmodels/patients.js";
//import Referral from "../config/db/orm/ormmodels/referrals.js";
//import User from "../config/db/orm/ormmodels/user.js";
import vertok from "../utils/jwt/verjwt.js";
import { genmail } from "../utils/mail/mailer.js";
import models from "../config/db/orm/sequalize.js";

const {Patient,Referral,User} = models;



//dashboard
//add ipatient as role coz well even docs can be sick sometimes

export const patdash = async(req,res) =>{
try{
    const ah = req.headers['authorization'];
    if(!ah) return res.status(403).json({error:'Missing auth token'});
    if(!ah.startsWith("Bearer ")) return res.status(401).json({error:'Invalid token format'});
    const token = ah.split(" ")[1];
    const decoded = vertok(token); 
    if(!decoded) return res.status(401).json({error:' Invalid  or expired token '});
    const pd = decoded?.id?.patient;
    const pid = pd.id
    const usid = pd.userId;
    const pus = await User.findByPk(usid);
    const pat = await Patient.findByPk(pid);
    if(!pus) return res.status(404).json({error:'You are not a registered user'});
    if(!pat) return res.status(404).json({error: 'Your patient details have not been submitted yet'});
    if(!pd || !pd.userId || pd.emergency_cont_name || pd.emergency_cont_phone || pus.user_role !== 'patient' || pd.national_id !== pat.national_id) return res.status(403).json({error:'Diddy  gave  you  this sumggled token right? '});
    const pr = await Referral.findOne({where:{patient_id: pid}});


//what if hana referralss narudi ..
const patpay ={
  message: `Welcome ${pus.fname} ${pus.lname}`,
  patient:{
    name: `${pus.fname} ${pus.lname}`,
    patient_id: pat.id,
    user_id: pus.id,
    national_id: pat.national_id,
    blood_type: pat?.blood_type || 'Not specified',
    chronic_conditions: pat?.chronic_conditions || 'None',
    emergency_cont_name: pat?.emergency_cont_name || 'None',
    emergency_cont_phone: pat?.emergency_cont_phone || 'None',
    is_insured: pat?.is_insured || 'Not insured',
    insurance_type: pat?.insurance_type || 'Not insured'
  }


};

if(!pr) return res.status(200).json({patient:{patpay}, referrals:'Seems you have none'});




    const patientReferrals = await Referral.findAll({
        where: { patient_id: pid },
        include: [
          {
            model: Patient,
            as: 'ref_patient',
            attributes: ['id', 'blood_type', 'allergies', 'chronic_conditions', 'is_insured', 'insurance_type','emergency_cont_name','emergency_cont_phone'],
            include: [
              {
                model: User,
                as: 'user_patient',
                attributes: ['id', 'fname', 'lname', 'email', 'phone', 'gender', 'age']
              }
            ]
          },
          {
            model: User,
            as: 'referer',
            attributes: ['id', 'fname', 'lname', 'email', 'user_role']
          },
          {
            model: Facility,
            as: 'facfro',
            attributes: ['fac_name', 'fac_type']
          },
          {
            model: Facility,
            as: 'facto',
            attributes: ['fac_name', 'fac_type']
          },
          {
            model: ReferralNote,
            as: 'summary',
            required: false
          }
        ],
        order: [['created_at', 'DESC']]
      });





      
      const aptp = {
        patient: {
          patient_id: patientReferrals[0]?.patient?.id,
          user_id: patientReferrals[0]?.ref_patient?.user_patient?.id,
          name: `${patientReferrals[0]?.ref_patient?.user_patient?.fname} ${patientReferrals[0]?.ref_patient?.user_patient?.lname}`,
          gender: patientReferrals[0]?.ref_patient?.user_patient?.gender,
          age: patientReferrals[0]?.ref_patient?.user_patient?.age,
          contact: {
            email: patientReferrals[0]?.ref_patient?.user_patient?.email,
            phone: patientReferrals[0]?.ref_patient?.user_patient?.phone,
            emergency_cont_name: patientReferrals[0]?.ref_patient?.emergency_cont_name || 'No emergency contact',
            emergency_cont_phone: patientReferrals[0]?.ref_patient?.emergency_cont_phone || 'No emergency contactos'
          },
          medical_info: {
            blood_type: patientReferrals[0]?.ref_patientpatient?.blood_type,
            allergies: patientReferrals[0]?.ref_patient?.allergies,
            chronic_conditions: patientReferrals[0]?.ref_patient?.chronic_conditions,
            insured: patientReferrals[0]?.ref_patient?.is_insured  || 'Not insured',
            insurance_type: patientReferrals[0]?.ref_patient?.insurance_type ?? 'Not specified'
          }
        },
        referrals: patientReferrals.map(ref => ({
          referral_id: ref.id,
          status: ref.status,
          priority: ref.priority,
          reason: ref.reason,
          referred_on: ref.created_at,
          from_facility: {
            name: ref.facfro?.fac_name,
            type: ref.facfro?.fac_type
          },
          to_facility: {
            name: ref.facto?.fac_name,
            type: ref.facto?.fac_type
          },
          referer: {
            name: `${ref.referer?.fname} ${ref.referer?.lname}`,
            email: ref.referer?.email,
            role: ref.referer?.user_role
          },
          notes: ref.summary?.map(note => ({
            note: note.note,
            noted_at: note.created_at
          }))
        }))
      };


      return res.status(200).json({Patient: {aptp}});
      







}

catch(err){

    console.log(err.message);
    res.status(500).json({error:'Could not fetch patient data'});






}





};




















export const subpat = async(req,res)=>{

    try{

        if(!req.body) return res.status(404).json({error:'Misssing request body'});

    const {national_id,blood_type,allergies,chromic_conditions,emergency_cont_name,emergency_cont_phone,is_insured,insurance_type} = req.body;
    const ah = req.headers['authorization'];
    if(!ah) return res.status(401).json({error:'Missing auth token'});
    if(!ah.startsWith('Bearer ')) return res.status(403).json({error:'Invalid token format'});
    if(!blood_type || !emergency_cont_name || !emergency_cont_phone) return res.status(401).json({error:'Please specify required fields'});
    if(is_insured && !insurance_type) return res.status(403).json({error:'Please specify insurance type'});
    const token = ah.split(" ")[1];
    const decoded = vertok(token); //todo edit vertok.js and ad an error handler
    if(!decoded) return res.status(401).json({error:' Invalid  or expired token '});
    const pd = decoded?.id?.patient;
    if(!pd || !pd.userId || pd.emergency_cont_name || pd.emergency_cont_phone) return res.status(403).json({error:'Didi you sumggle this token'});
    //no need for role check of patient coz even doctors could get sick also lets keep fearing women
    //my code is trash man...
    const usid = pd.userId;
    const getp = User.findByPk(usid);
    if(!getp) return res.status(404).json({error:'Please register first before submitting your details'});
    if(!getp.is_verified) return res.status(403).json({error:'Please verify email first'});
    if(getp.age >= 18 && !national_id) return res.status(403).json({error:'You are of age..please submit your national id'});

    const  subp = await Patient.create({
        national_id,
        blood_type,
        allergies,
        chromic_conditions,
        emergency_cont_name,
        emergency_cont_phone,
        is_insured,
        insurance_type
    });

    if(!subp) return res.status(500).json({error:'Could not submit patient details'});

    const papey = {
        message: `Sbubmitted as  ${getp.fname} ${getp.lname}`,
        patient:{
          id:subp.id,
          userId:subp.user_id,
          national_id: subp?.national_id || 'Under age',
          blood_type: subp?.blood_type || 'Unknown',
          chronic_conditions:subp?.chronic_conditions || 'None',
          emergency_cont_name: subp?.emergency_cont_name || 'Not available',
          emergency_cont_phone: subp?.emergency_cont_phone || 'Not specified',
          is_insured: subp?.is_insured || 'Not insured',
          insurance_type: subp?.insurance_type || 'Not specified'
  
        }
       };

       res.status(201).json({
        papey
       });


       //notify via email


       const sub = 'Patient details submitted sucessfully';
       const email = getp.email;

       const template = `<html>
       <head><title>Submission of patient data</title></head>
       <body>
        <p>Dear ${getp.fname};</p><br>
        <p>Your patient details have been submitted succesfully</p>
            <p class="value"><span class="label">Name: </span> ${getp.fname} ${getp.lname}</p>
                                <p class="value"><span class="label">Age:</span> ${getp.age}</p>

                <p class="value"><span class="label">National ID:</span> ${subp?.national_id || 'Under age'}  </p>
                    <p class="value"><span class="label">Blood type:</span> ${subp?.blood_type || 'Not specified'}</p>
                                        <p class="value"><span class="label">Chronnic Condition: </span> ${subp?.chronic_conditions || "No chronic conditions"}</p>
                                                            <p class="value"><span class="label">Emergency contact Name: </span> ${subp?.emergency_cont_name || 'None'}</p>
                            <p class="value"><span class="label">Emergency Contact phone: </span> ${subp?.Patient.emergency_cont_phone || "None"}</p>
                    <p class="value"><span class="label">Is insured:</span> ${subp?.is_insured || "Nope"}</p>
                                        <p class="value"><span class="label">Insurance type: </span> ${subp?.insurance_type || "Not insured"}</p>
    </body>

 </html>`;



await  genmail(email,sub,template);

  

    }

    catch(err)
    {
        console.log(err.message);
        res.status(500).json({error:'Could not submit patient details'});



    }










};