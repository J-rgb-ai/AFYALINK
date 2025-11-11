
import Facility from "../config/db/orm/ormmodels/facility.js";
import User from "../config/db/orm/ormmodels/user.js";
import vertok from "../utils/jwt/verjwt.js";




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
            photo: fac?.photo || "Not available",
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