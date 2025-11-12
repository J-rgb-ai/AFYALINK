import { format } from "morgan";
import Surgeon from "../config/db/orm/ormmodels/surgeon.js";
import vertok from "../utils/jwt/verjwt.js";
import User from "../config/db/orm/ormmodels/user.js";
import Doctor from "../config/db/orm/ormmodels/doctors.js";
import Facility from "../config/db/orm/ormmodels/facility.js";
import gentok from "../utils/jwt/genjwt.js";
import { genmail } from "../utils/mail/mailer.js";
import { TableHints } from "sequelize";
import Patient from "../config/db/orm/ormmodels/patients.js";
import Referral from "../config/db/orm/ormmodels/referrals.js";





//use auth given as a doctor btw
export const addsug = async (req,res) =>{

try{
    if(!req.body) return res.status(403).json({error: 'Missing request body'});
    const{license_number,qualification,years_experience,operating_facility_id,is_consultant} = req.body;
    if(!license_number || !qualification || !years_experience || !operating_facility_id) return res.status(401).json({error: 'Please fill out the necessary fields', format: {
        license_number: "MED-KE-2025-00421",
        qualification: "MBChB, MMed (Internal Medicine)",
        years_experience: 8,
        operating_facility_id: 12,
        is_consultant: true
      }
      });


      const ah = req.headers['authorization'];
      if(!ah) return res.status(403).json({error: 'Missing auth header'});
      if(!ah.startsWith('Bearer ')) return res.status(401).json({error: 'Invalid token format..'});
      const token = ah.split(" ")[1];
      const decoded = vertok(token);
      if(!decoded) return res.status(401).json({error: 'Invalid or expired token'});
      const dc = decoded?.id?.doctor;
      if(!dc || !dc.verified || !dc.is_spec || dc.role !== 'doctor' || dc.lic_no !== license_number ) return res.status(403).json({warn: 'Smuggled tokens will be reported..last warning'});
      const usid = dc.userId;
      const docid = dc.docid;
      const user = await User.findByPk(usid);
      const doc = await Doctor.findByPk(docid);
      if(!user) return res.status(403).json({error: 'Unregistered user cannot perform this action'});
      if(!user.is_verified) return res.status(403).json({error:'Please verify email first'});
      if(!doc) return res.status(403).json({error:'Please submit your doctor details first'});
      if(usid !== doc.user_id || user.user_role !== 'doctor'|| doc.license_number !== license_number) return res.status(401).json({warn: 'Please mantain credibility of your details.no unethical actions allowed'});
      const sug = await Surgeon.create({
        user_id: usid,
        doctor_id: docid,
        license_number,
        qualification,
        years_experience,
        operating_facility_id,
        is_consultant
      });
      if(!sug) throw new Error('Database failed to respond..couldnt submit surgeon records');

    const sg = await Surgeon.findOne({where:{license_number}});
    if(!sg) return res.status(401).json({success: false, error: 'Surgeon not found'});
    if(is_consultant !== doc.is_consultant) throw new Error('Are you a consultant or not ??');
    const facid = user.facility_id;
    if(facid !== operating_facility_id) throw new Error('Please input correct facilty id');
    const fac = await Facility.findByPk(facid);
    if(!fac) throw new Error('Facility not found please input a registered one');
    const facn = fac.fac_name;
    const fact = fac.fac_type;

    const sgp = {
        message: `Welcome back surgeon ${user.fname} ${user.lname}`,
        surgeon:{
            surgeonId: sg.id,
            userId: user.id,
            doctorId: doc.id,
            name: `${user.fname} ${user.lname}`,
            lic_no: sg.license_number,
            verified: user.is_verified,
            experience: sg.years_experience,
            facilty: `${facn} (${fact})`,
            is_consultant: sg?.is_consultant,
            is_specialist: doc.is_specialist,
            speciality: doc?.speciality || 'Not a specialist',
            created_at: sg.created_at
        }
    };

    const sgt = 'Bearer ' + gentok(sgp);


//send email that he is a surgeon
const email = user.email;
const sub = 'You are now a surgeon at Afyalink';
const temp = `<html>
<head><title>Thank you for registering as a surgeon at afyalink</title></head>
<body>
    <p>Dear ${user.lname};<br>
    WE are thrilled to announce that you are now a surgeon at afyalink<br>
    Thank you for joining us <br>
    Name: ${sgp.surgeon.name} <br>
    license: ${license_number}<br>
    experience: ${sgp.surgeon.experience}<br>
    facility: ${sgp.surgeon.facilty}<br>
    consultant: ${sgp.surgeon.is_consultant}<br>
    specialist: ${sgp.surgeon.is_specialist}<br>
    speciality: ${sgp.surgeon.speciality}<br>
    joined_at: ${sgp.surgeon.created_at}<br>
</p>

</body>


</html>`;


await genmail(email,sub,temp);


  res.status(201).json({sgp, surgeon_token: sgt});



}
catch(err){
    console.log(err.message);
    res.status(500).json({error: 'Could not submit surgeon details', details: err.message});



}




} ;



//use token from surgeon login or surgeon submit

export const sugdah = async(req,res) =>{

try{


    const ah = req.headers['authorization'];
    if(!ah) throw new Error('Missing auth header');
    if(!ah.startsWith('Bearer ')) throw new Error('Invalid token format');
    const token = ah.split(' ')[1];
    const decoded = vertok(token);
    if(!decoded) throw new Error('Invalid or expired token');
    const si = decoded?.id?.surgeon
    if(!si) throw new Error('This is not a surgeon token. where did you get it from?');
    if(!si.is_specialist || si.lic_no || si.facilty || !si.experience) throw new Error('I know a smuggled token when I see it');
    if(!si.verified) throw new Error('Unverified user cannot perform this action..please verify email first');
    const usid = si.userId;
    const docid = si.doctorId;
    const sid = si.surgeonId;
    const user = await User.findByPk(usid);
    const doc = await Doctor.findByPk(docid);
    const sur = await Surgeon.findByPk(sid);
    if(!user || !doc || !sur || user.role !== 'doctor') return res.status(401).json({error:'Please let us be ethical. you are not a surgeon'});
    //me nmechoka man... idk why am even here in the first place
    
    const fac = Facility.findAll();
    const pat = Patient.findAll({attributes:{exclude:['password_hash']}});
    const faci = user.facility_id;
    const fac1 = await Facility.findByPk(faci);
    if(!fac1) throw new Error('Ghost facilty worker detected');
    

    const sugp = {
        message: `welcome Surgeon ${user.fname} ${user.lname}`,
       surgeon: {
        userId: user.id,
        doctorId: doc.id,
        surgeonId: sur.id,
        name: `${user.fname} ${user.lname}`,
        lic_no: sur.license_number,
        experience: sur.years_experience,
        facility: `${fac1.fac_name} (${fac1.fac_type})`,
        is_consultant: sur.is_consultant,
        is_specialist: doc?.is_specialist,
        speciality: doc?.speciality || 'Not a specialist',
        created_at: sur.created_at
        }
    };


    const ref = await Referral.findOne({where:{referring_user_id:usid}});
    if(!ref) return res.status(200).json({surgeon: sugp, facilities: fac, patients: pat, referrals:'Seems you have no referrals'});


    const acrefs = await Referral.findAll({
        where: { reffering_user_id: docid },
        include: [
          {
            model: Patient,
            as: 'patient',
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['fname', 'lname', 'email', 'phone', 'gender', 'age']
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
      });


      const refpay1 = acrefs.map(ref => ({
        patient_name: `${ref.patient.user.fname} ${ref.patient.user.lname}`,
        contact: {
          email: ref.patient.user.email,
          phone: ref.patient.user.phone,
          gender: ref.patient.user.gender,
          age: ref.patient.user.age,
          emergency_person: ref.patient.emergency_cont_name,
          emergency_phone: ref.patient.emergency_cont_phone
        },
        medical_info: {
          blood_type: ref.patient.blood_type,
          allergies: ref.patient.allergies,
          chronic_conditions: ref.patient.chronic_conditions,
          insured: ref.patient.is_insured,
          insurance_type: ref.patient.insurance_type
        },
        referral_details: {
          priority: ref.priority,
          reason: ref.reason,
          status: ref.status,
          referred_on: ref.created_at,
          from: ref.facilityfrom?.fac_name,
          referring_type: ref.facilityfrom?.fac_type,
          to: ref.facilityto?.fac_name,
          receiving_type: ref.facilityto?.fac_type
        },
        notes: ref.referral_notes?.map(note => ({
          notes: note.note,
          noted_at: note.created_at
        }))
      }));
      
    

   
    const refpay = 'here';

    res.status(200).json({
        sugp,
        patients:{ getp},
        facilities:{faci},
        refpay1
    });




}
catch(err)
{


console.log(err.message);
res.status(500).json({error:'Could not fetch surgeon records', details: err.message});


}



};


//surgeon create referrall or just let em create at doc...
