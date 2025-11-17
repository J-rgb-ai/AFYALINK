import { where } from "sequelize";
//import Facility from "../config/db/orm/ormmodels/facility.js";
//import Nurse from "../config/db/orm/ormmodels/nurse.js";
//import Referral from "../config/db/orm/ormmodels/referrals.js";
//import User from "../config/db/orm/ormmodels/user.js";
import gentok from "../utils/jwt/genjwt.js";
import vertok from "../utils/jwt/verjwt.js";
import { genmail } from "../utils/mail/mailer.js";
//import Patient from "../config/db/orm/ormmodels/patients.js";
//import ReferralNote from "../config/db/orm/ormmodels/refnotes.js";
import models from "../config/db/orm/sequalize.js";

const{Facility,Nurse,Referral,User,Patient,ReferralNote} = models;
//nurse controller



export const addnus = async (req,res) =>{
try{

    if(!req.body) return res.status(403).json({error:'Missing request body'});
    const{license_number,cadre,qualification,experience,is_specialist,speciality}  = req.body;
    if(!license_number || !qualification || !experience) return res.status(401).json({error:'Please fill in the required fields'});

    if(speciality && !is_specialist) return res.status(403).json({error:'Are you a specialist or not? '});
    if(!speciality && is_specialist) return res.status(403).json({error:'Please state what you specialize in ei!'});
    const ah = req.headers['authorization'];
    if(!ah) return res.status(401).json({error:'Please provide an auth token'});
    if(!ah.startsWith('Bearer ')) return res.status(401).json({error:'Invalid token format'});
    const token = ah.split(" ")[1];
    const decoded = vertok(token);
    if(!decoded) return res.status(403).json({error:'Invalid  or expired token'});
    const usid = decoded.id;
    const demail = decoded.email;
    const nusen = await Nurse.findOne({where:{user_id:usid}});
    if(nusen) return res.status(301).json({error:'You are already a verfied nurse'});
    const usen = await User.findByPk(usid);
    if(!usen) return res.status(404).json({error:'You are not a registered user'});
    if(usen.email !== demail || !usen.is_verified || usen.user_role !== 'nurse') return res.status(403).json({warning: 'Action not permitted by authority'});

    const nursad = await Nurse.create({
        license_number,
        cadre,
        qualification,
        years_experience: experience,
        is_specialist,
        speciality
    });

    if(!nursad) return res.status(301).json({error:'Failed to verify  nurse'});
    const nursef = await Nurse.findOne({where:{license_number}});
    const nursep = {
        message: `Welcome Nurse ${usen.fname} ${usen.lname}`,
        nurse:{
            id: usen.id,
            name: `${usen.fname} ${usen.lname}`,
            license_number: nursef.license_number,
            cadre: nursef.cadre,
            qualification: nursef.qualification,
            experience: nursef.years_experience,
            role: usen.user_role,
            specialist: nursef?.is_specialist || "Not a specialist",
            speciality: nursef?.speciality || "Not specialized in any field",
            verified: usen.is_verified,
            verified_at: nursef.created_at
             }
    };

    const nt = 'Bearer ' + gentok(nursep);

    //send email that he/she is a nurse now

const sub = 'Nurse verification succesfull';
const email = usen.email;
const temp = `<html>
<head><title>You are a registered nurse on afyalink</title></head>
<body><p>Dear ${usen,fname};</p><br>
<p>Thank you for registering as a nurse on afyalink.</p>
    <p class="value"><span class="label">License no: </span> ${nursef.license_number}</p>
        <p class="value"><span class="label">Cadre: </span> ${nursef.cadre}</p>
            <p class="value"><span class="label">Qualification: </span> ${nursef.qualification}</p>
                <p class="value"><span class="label">Experience: </span> ${nursef.years_experience}</p>
                    <p class="value"><span class="label">Role: </span> ${nursep.role}</p>
                                        <p class="value"><span class="label">Specialist: </span> ${nursep.specialist}</p>
                                                            <p class="value"><span class="label">Speciality: </span> ${nursep.speciality}</p>
                    <p class="value"><span class="label">Verified: </span> ${nursep.verified}</p>
                                        <p class="value"><span class="label">Verified at: </span> ${nursep.verified_at}</p>
</body>

<footer><i>Do not reply to this automated email directly</i></footer>
</html>`;

await genmail(email,sub,temp);





    res.status(201).json({nursep,
        nurse_token: nt
    });










}

catch(err)
{

    console.log(err.message);
    res.status(500).json({error:'Could not verify nurse'});


}


};



//you'll need a token from nurse login...
//dont feeel like coding today idk why
//maybe its the pain of a struggling young man in the insane ranks of multiculturalism and capitalism tryna strugle and get some bread and misunderstood more often 




export const nursedash = async(req,res) =>{
    try{

        const ah = req.headers['authorization'];
        if(!ah) return res.status(403).json({error: 'Missing auth token in req header'});
        if(!ah.startsWith('Bearer ')) return res.status(401).json({error: 'Invalid token format'});
        const token = ah.split(" ")[1];
        const decoded = vertok(token);
        if(!decoded) return res.status(401).json({error: 'Invalid token'});
        const nid = decoded?.id?.nurse;
        const usid = nid.id;
        if(!nid || !nid.verified || !nid.license_number || nid.role !== 'nurse') return res.status(403).json({error: 'Did you smuggle this token'});
        const lic = nid.license_number;
        const noni = await Nurse.findOne({where:{license_number: lic}});
        if(!noni) return res.status(404).json({error:'You have not completed urse  registration on afylalink'})
        const nosi = await User.findByPk(usid);
        if(!nosi) return res.status(404).json({error:'Not a registered user'});
        const ai = nosi.id;
        if(nosi.id !== noni.usen) return res.status(403).json({warn: 'Action not permitted my nigga'});

        const nursep = {
            message: `Welcome Nurse ${nosi.fname} ${nosi.lname}`,
            nurse:{
            id: nosi.id,
            name: `${nosi.fname} ${nosi.lname}`,
            license_number: noni.license_number,
            cadre: noni.cadre,
            qualification: noni.qualification,
            experience: noni.years_experience,
            role: nosi.user_role,
            specialist: noni?.is_specialist || "Not a specialist",
            speciality: noni?.speciality || "Not specialized in any field",
            verified: nosi.is_verified,
            verified_at: noni.created_at
            }
        };



    const getnr = await Referral.findOne({where:{reffering_user_id: ai}});
    const faci = await Facility.findAll({exclude:['photo']});
    const getp = await Patient.findAll({attributes:{exclude:['password_hash']}}); //akuna kitu kaa hii nlimess
    if(!getnr) return res.status(200).json({nursep,patients:{getp}, facilities: {faci}, referrals: 'Seems like you have no referrals'});


        /*
        //i hate relationships man...be it in databases or even irl..they never seem to work out for me smh :(
        const nursi = await Nurse.findAll({where:{license_number: lic},
        include: [
            {
                model: User,
                as: 'nursee',
                attributes: ['id','fname','lname','email','phone','user_role'],
                include:[{
                    model: Facility,
                    as: 'fac',
                    attributes: ['fac_name','fac_type']
                }]
            },
            {
                model: Referral,
                as: ''

            }

        ]
        
        });
*/      
        const acrefs = await Referral.findAll({
            where: {reffering_user_id: ai},
            include:[
                {
                    model: Patient,
                    as: 'ref_patient',
                    include:[
                        {
                            model: User,
                            as: 'user_patient',
                            attributes: ['fname','lname','email','phone','gender','ager']
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
            
     } );


     const refpay2 = acrefs.map(ref=>({
        patient_name: `${ref.ref_patient.user_patient.fname} ${ref.ref_patient.user_patient.lname}`,
        contact: {
            email: ref.ref_patient.user.email,
            phone: ref.ref_patient.user.phone,
            gender: ref.ref_patient.user.gender,
            age: ref.ref_patient.user.age
        },
        medical_info: {
            blood_type: ref?.ref_patient?.blood_type || 'Not specified',
            allergies: ref?.ref_patient?.allergies || 'None',
            chronic_conditions: ref?.ref_patient?.chronic_conditions || 'None',
            insured: ref?.ref_patient?.is_insured || 'Not insured',
            insurance_type: ref?.ref_patient?.insurance_type || 'Not insured' 
        },
        referral_details:{
            priority: ref.priority,
            reason: ref.reason,
            status: ref.status,
            referred_on: ref.updated_at,
            from: ref.facfro.fac_name,
            referring_type: ref.facfro.fac_type,
            to: ref.facto.fac_name,
            receiving_type: ref.facto.fac_type
        },
        notes: ref.summary?.map(note=>({
            notes: note.note,
            noted_at: note.created_at
        }))

     }));

     res.status(200).json({
        nursep,
        patients:{getp},
        facilities: {faci},
        referrals: refpay2

     });




    }
    catch(err){
        console.log(err.message);
        res.status(500).json({error:'Could not fetch nurse details'});



    }




};


//nurse creating a referral


