import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import vertok from '../utils/jwt/verjwt.js';
import User from '../config/db/orm/ormmodels/user.js';
import verotp from '../utils/otp/verotp.js';
import Facility from '../config/db/orm/ormmodels/facility.js';
import gentok from '../utils/jwt/genjwt.js';
import Staff from '../config/db/orm/ormmodels/staff.js';
import Patient from '../config/db/orm/ormmodels/patients.js';
import Doctor from '../config/db/orm/ormmodels/doctors.js';
import Surgeon  from '../config/db/orm/ormmodels/surgeon.js';
import Nurse from '../config/db/orm/ormmodels/nurse.js';
import Labtech from '../config/db/orm/ormmodels/labtechs.js';
import Referral from '../config/db/orm/ormmodels/referrals.js';
import ReferralNote from '../config/db/orm/ormmodels/refnotes.js';
import BlockchainLog from '../config/db/orm/ormmodels/chainlogs.js';
import Visit from '../config/db/orm/ormmodels/visits.js';
import LabResult from '../config/db/orm/ormmodels/labres.js';
import Payment from '../config/db/orm/ormmodels/payments.js';
import Department  from '../config/db/orm/ormmodels/departments.js';











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
    if(!decoded || !adm|| !adm.verified || !adm.email || adm.role !== 'admin') return res.status(401).json({error:'Something fishy..did you smuggle this token?'});
    const storedo = await verotp(adm.id);

    if(otp !== storedo) return res.status(401).json({error: 'Invalid or expired otp'});

    
    const email = adm.email;
    const user = await User.findOne({where: {email}});
    if(!user) return res.status.json({error: 'admin not found'});
    if(user.user_role !== 'admin' || !user.is_verified) return res.status(401).json({error: 'You are not  an elgible admin'});
    const facid = user.facility_id;
    const fac = await Facility.findByPk(facid);
    const facname = fac?.fac_name || 'Unknown';
    const factype = fac?.fac_type || 'Unknown';

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
                        hauth: true,
                        joined: user.created_at
                    }};

        const admintok = 'Bearer ' + gentok(adminpay);


        res.status(200).json({
            adminpay,
            admintoken: admintok
        });
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
    if(!adm.hauth ||adm.role !== 'admin' || !adm.verified) return res.status(401).json({error: 'Seems like a smuggled token to me'});

    const id = adm.id;
    const user = await User.findByPk(id);
    if(!user) return res.status(401).json({error: 'Admin not found'});
    const facid = user.facility_id;
    const fac = await Facility.findByPk(facid);
    const facname = fac?.fac_name || "unknown";
    const factype = fac?.fac_type || "Unknown";


    //payloads

    //admin

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

    
     const allfac = await  Facility.findAll();
     const allus = await User.findAll({attributes:{exclude:['password_hash']}});
     const allstaff = await Staff.findAll();
     const allpat = await Patient.findAll();
     const alldoc = await Doctor.findAll();
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


//fetch from users where is refmanager or admin
const refrole = 'refmanager';
const admirole = 'admin';

const getref = await User.findAll({where:{user_role:refrole}, attributes:{exclude:['password_hash']}});
const getad = await User.findAll({where:{user_role:admirole},attributes:{exclude:['password_hash']}});

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
            BlockchainLogs: allb
         },
         Main:{
            RefManagers: getref,
            Admins: getad

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
        if(!req.query) {
            const search = req.query;
        }

        const ah = req.headers['authorization'];
        if(!ah) return res.status(401).json({error: 'Missing auth header'});
        if(!ah.startsWith('Bearer ')) return res.status(401).json({error: 'Invalid token format'});

        const token = ah.split(" ")[1];

        //narudi acha nfike soko 







    }
    catch(err)
    {

        console.log(err.message);
        res.status(500).json({error: 'Failed to fetch database logs'});





    }








}