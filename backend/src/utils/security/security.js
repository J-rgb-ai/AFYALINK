import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redis from '../../config/redis/redis.js';
//import User from '../../config/db/orm/ormmodels/user.model.js';
//import Blocked from '../../config/db/orm/ormmodels/blockip.model.js/index.js';
import { Op } from 'sequelize';
import { genmail } from '../mail/mailer.js';
import chalk from 'chalk';
import models from '../../config/db/orm/sequalize.js';


const{User,Blocked} = models;



export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message:{
        success: false,
        error: 'Too many requests for this ip. Denial of Service attack detected',

    },
    standardHeaders: true,
    legacyHeaders: false
});

/*
export const redislimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redis.sendCommand(args),


    }),
    windowMs: 10 * 60 * 1000,
    max: 50
});*/


export const blockip = async(req,res,next) =>{
    try{

    const bl = await Blocked.findAll({where:{blocked: true}});
    
    if(!bl) return console.log('No ips to block today');
    const bloked = bl.map(e=> e.ip);
   // console.log(bloked);
    const ip = req.ip;

if(bl){
    if(bloked.includes(ip)){
        console.warn(chalk.red(`Blocked ip attempt ${req.ip} on ${req.method}  ${req.originalUrl} at ${new Date()}`));
        return res.status(403).json({warn: `Due to repeated malicious actions ${req.ip} is not allowed to acess ${req.originalUrl} at  ${new Date()}`});
    }
    next();
}}

    catch(e)
    {
        console.log(chalk.green(e.message));
    }
};

//create db to implement this shii and avoid redis


export const autoban = async(req,res,next)=>{

    const bl = Blocked.findAll({where:{blocked:true}});
    if(!bl) console.log('No blocked ip in database');
const ip = req.ip;
const bd = req.body;
const mt = req.method;
const he = req.headers;
//console.log(he);
const rq = req?.headers['authorization'] || 'No auth headers';
const token = rq?.split(" ")[1] || 'Not available';

const key = `ip:${ip}:hits`;
const bl1 = await Blocked.findOne({where:{ip}});
const r = new Date();
const t = r.toLocaleString();
console.log(chalk.blue(t));

if(!bl1){
   await  Blocked.create({
        req_body: bd,
        req_head: he, 
        auto_block: true,
        hits: 1,
        ip: ip,
        time: t,
        decoded_tok: token,
        req_meth: mt

    });
}






try{
    const b = await Blocked.findOne({where:{ip}});

    const hits = parseInt(b.hits) + 1;
     await Blocked.update({hits},{where:{ip}});
     const time = b?.time;
     const gh = time.getTime();
     const now = new Date().getTime();
     const ds = now - gh;
     const diff =  Math.floor(ds/(1000*60*60));
     console.warn(chalk.redBright(req.ip + ' Time limit : '  + diff + ' hours'));
     //const diff = 10;
     console.log(chalk.green(`From: ${time} TO: ${new Date()}`));
     console.log('\n');
     console.log(chalk.red(`current_req: ${b.hits}  remaining_req: ${100 - parseInt(b.hits)}`));
     

     
     
     //should at it to reset hits after one hour based on created at timestamp or updatedat 
     // idk which would be better


     if(diff < 1 )
     {


    if(hits> 100)  {

        await Blocked.update({blocked:true},{where:{ip}});

        console.warn(`Auto banned ip:  ${req.method} --> ${req.ip}: ${new Date()} `);
        const admins = await User.findAll({where:{user_role:{[Op.in]:['admin','iadmin']}}});

        if(!b.sent){

        for(let i=0; i<admins.length; i++){ //i dont think this will work..man why am i not learning anything
            const email = admins[i].email;
            const sub = 'IP AUTOBAN should get a ban emoji here maybe  🚫';
            const temp = `<html><head><title>  🚫 Auto ban of ${req.ip}</title></head>
            <body><p>Due to malicious activity detected on <b>${req.method}</b> <i>${req.originalUrl}</i> from <br> ${req.ip} </b><br>
            at ${new Date() }<br>
            we have decided to autoban it </p>
            </html>`;
            await genmail(email,sub,temp);
            console.log(chalk.yellow(`Sent autoban alert to ${email}`));
        }
        await Blocked.update({sent: true},{where: {ip}});
    }




      //  return res.status(403).json({error: `could not ${req.method} on ${req.originalUrl} because ${req.ip} was banned due to repeated unethical activites..`});


    }}

    else if(diff > 1){
        await Blocked.destroy({where:{ip}});
        console.log(chalk.blue(`Limit reset for ${req.ip} at : ${new Date()}`));
    }

    next();


}catch(err){

    console.log(chalk.red(err.message));
    next();
}



};


export const blokipm = async(req,res,next)=>{

    try{
        const ip = req.ip;
        const tb = await Blocked.findOne({where:{ip:ip,blocked:true}});
        if(tb){
            return res.status(403).json({error:`You are forbidden to access this site due to suspicious activity`});
        }
        if(!tb)
        {
            console.log(chalk.cyan(`${req.method}: ${req.originalUrl} ${new Date()}`));
        }

        next();



    }
    catch(y)
    {
        console.log(chalk.red(y.message));
        next();


    }
}



