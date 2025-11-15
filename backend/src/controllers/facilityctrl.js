
import chalk from "chalk";
import models from "../config/db/orm/sequalize.js";
//import Facility from "../config/db/orm/ormmodels/facility.js";
//import User from "../config/db/orm/ormmodels/user.js";
import vertok from "../utils/jwt/verjwt.js";
import dotenv from 'dotenv';
import multer from 'multer';
import { format } from "morgan";

dotenv.config();

const {Facility,User} = models;




//view facilites

export const viewfac = async(req,res) =>{

try{

    if(req.params.fid){
        const fid = req.params.fid;
        if(isNaN(fid)) return res.status(403).json({error:'Please insert a number in the id field'});

        const fac = await Facility.findByPk(fid);
        if(!fac) return res.status(404).json({error:'Facility not found'});
    

        const facp = {
            message: 'Facility found',
            id: fac.id,
            name: fac.fac_name,
            type: fac.fac_type,
            location: fac.location,
            country: fac.country,
            //photo: fac?.photo || "Not available",
            phone: fac?.fac_phone,
            email: fac?.fac_email,
            sha_code:fac?.sha_code || 'Not registered',
            active: fac?.is_active,
            joined: fac?.created_at || 'Not specified'
    
        };
    
        return res.status(200).json({
            facp
        });





    }


    else{

        /*

    const fac = await Facility.findAll();
    if(!fac) return res.status(404).json({error:'NO registered facilites'});
    const facp = { //haisaidii anything adi idk what i was thinking.. 
        message: 'List of registered facilites on afyalink',
        id: fac.id, //so hungry i could eat a bullet to my skull
        name: fac.fac_name,
        type: fac.fac_type,
        location: fac.location,
        country: fac.country,
        photo: fac?.photo || "Not available",
        phone: fac?.fac_phone,
        email: fac?.fac_email,
        sha_code:fac?.sha_code || 'Not registered',
        active: fac?.is_active,
        joined: fac?.created_at || 'Not specified'

    };

    return res.status(200).json({
        message: 'List of registered facilites on afyalink',
        fac
    });

    const ps = 2;
    let p = 1
    let tp = 1;

    do{
        var {count,rows} = await Facility.findAndCountAll({offset:(p-1)*ps, limit: ps});
        console.log(count);
        tp = Math.ceil(count/ps);
        if(!rows) return res.status(404).json({error: 'No faccilities registered yet'});
        
        console.log(chalk.cyan(`Processing page: ${p} of ${tp}`));

        const facp = { //haisaidii anything adi idk what i was thinking.. 
            message: 'List of registered facilites on afyalink',
            id: rows.id, //so hungry i could eat a bullet to my skull
            name: rows.fac_name,
            type: rows.fac_type,
            location: rows.location,
            country: rows.country,
            photo: rows?.photo || "Not available",
            phone: rows?.fac_phone,
            email: rows?.fac_email,
            sha_code:rows?.sha_code || 'Not registered',
            active: rows?.is_active,
            joined: rows?.created_at || 'Not specified'
    
        };
        p++;
         res.status(200).json({
            message: 'List of registered facilites on afyalink',
             facilities: rows
        });
    



    }while(p<+tp);*/

    const ps = parseInt(process.env.PAGE);
   // console.log(ps);
    let p = 1;
    const {count} = await Facility.findAndCountAll({limit: 1});
   // console.log(count);
    const tp = Math.ceil(count/ps);
    res.setHeader('Content-Type','application/json');
    res.write('facilities:{');

    for(p=1;p<=tp;p++){
        const offset = (p-1)*ps;
        const{rows} = await Facility.findAndCountAll({offset,limit:ps, attributes:{exclude:['photo','mime']}});
        const jsn = rows.map(f=>JSON.stringify(f)).join(',');


        if(p>1) res.write(',');
        
        res.write(jsn);
      //  console.log(`Sent page ${p}/${tp} on ${req.method} ${req.originalUrl}`);
    }

    res.write('}');
    res.end();
   
    




}



}

catch(err)


{

    console.log(err.message);
    res.status(500).json({error:'Could not get facility'});


}


};


//admin or iadmin adding facilities on afyalink


export const addfac = async(req,res) =>{


    try{
    if(!req.body) return res.status(403).json({error:'Missing request body'});
    const{fac_name,fac_type,location,country,fac_phone,fac_email,sha_code} = req.body;
    const ah = req.headers['authorization'];
    if(!ah) return res.status(403).json({error:'Missing authorization token in request header'});
    if(!ah.startsWith('Bearer ')) return res.status(401).json({error:'Invalid token format'});
    if(!fac_name || !fac_type || !location || !fac_phone || !fac_email || !country || !sha_code) return res.status(403).json({error:'Please input the required fields'});
    const token = ah.split(" ")[1];
    const decoded = vertok(token);
    if(!decoded) return res.status(401).json({error:'Invalid or expired token'});
    const adm = decoded?.id?.admin;
    if(!adm || !adm.hauth || !(adm.role === 'admin' || adm.role === 'iadmin')) return res.status(403).json({error:'This token been smuggled buddy'});
    const  adi = adm.id;
    const getad = await User.findByPk(adi);
    if(!getad) return res.status(404).json({error:'User is no longer registered on afyalink'});
    if(!(getad.user_role === 'admin' || getad.user_role === 'iadmin')) return res.status(403).json({error:`User of role ${getad.user_role} cannot perform this action`});
    
   const addf =  await User.create({
        fac_name,
        fac_type,
        location,
        country,
        fac_phone,
        fac_email,
        sha_code
    });

    const pay = {
        message: `${addf.fac_name} added succesfully`,
        Facility:{
            name: addf?.fac_name,
            type: addf?.fac_type,
            location: addf?.location,
            country: addf?.country,
            phone: addf?.fac_phone,
            email: addf?.fac_email,
            sha_code: addf?.sha_code,
            added: addf?.created_at || 'Not specifed',
            by: `${getad.fname} ${ getad.lname}` ,
            role: getad.user_role
        }
    };


    return res.status(201).json({
        pay
    });


    //send email that a facility was added both to admin and iadmin //todo




    }


    catch(err)
    {

        console.log(err.message);
        res.status(500).json({error:'Could not add facility'});


        
    }

};

export const facpic = async(req,res)=>{
try{
    const fori = {
        facid: 2,
        update: 'yes/no',
        photo: 'req.file'
    };

    if(!req.body) return res.status(400).json({error: 'Missing request body',format: fori});
    const {facid,update} = req.body;
    if(!req.file) return res.status(400).json({error:'Missing file'});
    if(!facid || !update) return res.status(422).json({error: 'Missing required fields',format: fori});
    if(!(update === 'yes' || update === 'no')) return res.status(422).json({error:`update can only be of value yes/no and not ${update}`});
    const ah = req.headers['authorization'];
    if(!ah) return res.status(401).json({error:'Missing auth header'});
    if(!ah.startsWith('Bearer ')) return res.status(403).json({error: 'Invalid token format'});
    const token = ah.split(' ')[1];
    const decoded = vertok(token);
    if(!decoded) return res.status(401).json({error:'Invalid token'});
    const adm = decoded?.id?.admin;
    if(!adm || !adm.verified || !(adm.role === 'admin' || adm.role === 'iadmin')) return res.status(403).json({error: 'You are not ellgible to perform this action'});
    const usid = adm.id;
    const user = User.findByPk(usid);
    if(user.disabled) return res.status(403).json({error: 'Your account was disabled on afyalink..please contact support'});
    if(!user.is_verified) return res.status(403).json({error: `${user.fname} is unverifed and so cannot perform this action`});
    if(!(user.user_role === 'admin' || user.user_role === 'iadmin')) 
        {   if(parseInt(user.no_dis)=== 0 ){
            user.disabled = true;
            user.no_dis = 1;
            user.dis_res = `Tried to upload a facility pic at ${new Date()} yet he is of role ${user.user_role}`;
            await user.save();
            return res.status(403).json({error:`Users of role: ${user.user_role} cannot perform this action.. infact never come back here coz we gonna disable your shitty  account`});}
            else{
                user.disabled = true;
                const t = parseInt(user.no_dis);
                user.no_dis = t + 1;
                user.dis_res = `Tried to upload a facility pic at ${new Date()} yet he is of role ${user.user_role}`;
                await user.save();
            return res.status(403).json({error:`Users of role: ${user.user_role} cannot perform this action..We've disabled your account ${t} still havent learnt a lesson?..`});


            }
        }
if(isNaN(parseInt(facid))) return res.status(422).json({error:`facid must be an interger value and not ${facid}`});
    const fac = await Facility.findByPk(facid);
    if(!fac) return res.status(401).json({error:`No existing facility with id  ${facid}`});
    if(!fac.is_active) return res.status(403).json({oops:`${fac.fac_name} (${fac.fac_type}) is inactive at the moment`});
    //disable this during testing
    if(user.facility_id !== facid) return res.status(403).json({error:`You can only make changes on your facility`});

    if(update === 'yes')
    {
        const file = req.file;
        fac.photo = file.buffer;
        fac.mime = file.mimetype;
        await fac.save();

        return res.status(201).json({
            success: true,
            message: 'Photo added succesfully',
            facility:{
                name:`${fac.fac_name} (${fac.fac_type})`,
                added: fac?.updated_at || `${new Date()}`
            }
        });

    }
    else if(update === 'no')
    {
        if(fac.photo) return res.status(422).json({error:`${fac.fac_name} (${fac.fac_type}) already has a photo uploaded..try updating`});
        
        const file = req.file;
        fac.photo = file.buffer;
        fac.mime = file.mimetype;
        await fac.save();

        return res.status(201).json({
            success: true,
            message: 'Photo added succesfully',
            facility:{
                name:`${fac.fac_name} (${fac.fac_type})`,
                added: fac?.updated_at || `${new Date()}`
            }
        });


    }

}
catch(dinywa)
{
    console.log(dinywa.message);
    return res.status(501).json({error: 'Could not upload facility picture'});
}

}

export const facviup = async(req,res)=>{

    try{
    const fid = req.params.fid;
    if(isNaN(parseInt(fid))) return res.status(422).json({error:'Facility id must be an interger'});
    const fac = Facility.findByPk(fid);
    if(!fid) return res.status(404).json({error:`No such Facility`});
    if(!fac.photo) return res.status(404).json({error:`${fac.fac_name} (${fac.fac_type}) has no photo uploaded yet..`});
    const b64 = fac.photo.toString('base64');
    const pp = `data:${fac.mime};base64,${b64}`;
    const display_frontend = "<img src={facility.photo}>";
    return res.status(200).json({
        display_frontend: display_frontend,
        facility:{
            id:fid,
            photo:pp
        }
    });
}

catch(y)
{
    console.log(y.message);
    return res.status(503).json({error: `Could not fetch photo`});
}



}


