/*const express = require('express');
const app = express();
const r = require('./routes/authRoutes');

require('dotenv').config();




app.use(r);

const port = 3000 || process.env.PORT;




app.get('/', (req,res)=>{
  res.status(200);
  res.send('Welcome to afyalinkback');
}*/



import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import {sequelize} from './config/db/orm/sequalize.js';
import userrouter from './routes/authRoutes.js';
import adminroute from './routes/adminroute.js';
import docroute from './routes/docroute.js';
import refroute from './routes/refmanroute.js';
import patroute from './routes/patientrout.js';
import facr from './routes/facilityr.js';
import nurseroute from './routes/nurser.js';
import surgr from './routes/surgeonroute.js';
import labr from './routes/labtechroute.js';
import redis from './config/redis/redis.js';
import morgan from 'morgan';
import chalk from 'chalk';
import { autoban, blockip,blokipm } from './utils/security/security.js';
//import cors from 'cors';



const app = express();
dotenv.config();

app.use(helmet());

app.use(morgan('dev'));

app.use(blokipm);
app.use(autoban);
//app.use(blockip);
//app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

/*

//server mantainance

app.use((req,res,next)=>{
  return res.status(503).json({warn:`Mantainance in progress`});
});

app.use((req,res,next)=>{
  return res.status(404).json({success: false, warn: ` ${req.method} ${req.originalUrl} not found on the server`});
});

*/

//TODO implement tls 



app.use('/api/users',userrouter);
app.use('/api/users/admin',adminroute);
app.use('/api/users/doctors', docroute);
app.use('/api/users/refman', refroute);
app.use('/api/users/patients',patroute);
app.use('/api/facilities',facr);
app.use('/api/users/nurses',nurseroute);
app.use('/api/users/doctors/surgeons',surgr);
app.use('/api/users/labtechs',labr);


//redis test

try{

  console.log(chalk.blue('Connecting to redis server...'));

  await redis.set('ping','pong');
  const dated = await redis.get('ping');
  if(dated)  console.log(chalk.red(`Connected to Redis on ${process.env.RED_PORT}`));

}
catch(err){
  console.log(chalk.redBright(`Could not connect to redis ${err.message}`));
}











//deb test


try{
  console.log(chalk.yellow('Connecting to database.....'));
  await sequelize.authenticate();
  await sequelize.sync({alter:false});
  console.log(chalk.blue('Models synced'));

  console.log(chalk.green(`Connected to database ${process.env.DB_NAME} on port ${process.env.DB_PORT}`));

}
catch(err){

  console.log(chalk.red('Nuh could not connect to db'));
  console.log(chalk.red(err.message));


}








const port = 80 || process.env.PORT;



try{
app.all('/api/v1', (req,res)=>{
  res.status(200).json({message: 'Welcome to afyalink api. Here are  the endpoints',
    endpoints:{
     users:[ 'POST  /api/users/sigunp',
      'POST /api/users/signin',
      'GET /api/users/3',
      'POST /api/users/forgotpass',
      'PUT /api/users/resetpass',
      'POST /api/users/verify/email',
      'GET /api/users/admin/auth',
      'GET /api/users/admin/dashboard',
      'GET /api/users/admin/logs',
      'PUT /api/users/admin/create',
      'POST /api/users/admin/delete',
      'POST /api/users/admin/approve',
      'POST /api/users/admin/block/ip',
      'POST /api/users/doctors/verify',
      'GET /api/users/doctors/dashboard',
      'POST /api/users/doctors/referrals/add',
      'POST /api/users/doctors/referrals/create',
      'POST /api/users/doctors/visits/create',
     'POST /api/users/refman/referrals/approve',
      'GET /api/users/refman/referrals/dashboard',
      'POST /api/users/refman/referrals/accept',
      'POST /api/users/patients/submit',
      'GET /api/users/patients/dashboard',
      'POST /api/users/nurses/verify',
      'GET /api/users/nurses/dashboard',
      'POST /api/users/nurses/referrals/create',
      'POST /api/users/nurses/visits/create',
      'POST /api/users/doctors/surgeons/submit',
      'GET /api/users/doctors/surgeons/dashboard',
      'POST /api/users/doctors/surgeons/referrals/create',
      'POST /api/users/doctors/surgeons/visits/create',
      'POST /api/users/labtechs/submit',
      'GET /api/users/labtechs/dashboard',
      'POST /api/users/labtechs/referrals/create',
      'POST /api/users/labtechs/visits/create'
      
      


     ],
     
     facilities:[
      'GET /api/facilities/view',
      'GET /api/facilities/view/1',
      'POST /api/facilities/add',
      'POST /api/facilities/upload/photo',
      'POST /api/facilities/1/photo'
     ]
    }
  });



});














app.all('/', (req,res) =>{
  res.status(200).json({rada: "Server iko on mbaya"});
});




app.all("*",(req,res)=>{
  res.status(404).json({success: false, message: `${req.originalUrl} not found on this server`,});
});






}

catch(err)
{

  console.log(chalk.redBright(err.message));
  
  
 // res.status(500).json({error:'The server unexpectedly ran into an error'});
}









































app.listen(port,()=>{
console.log(chalk.yellowBright(`Backend Server running on port ${port}......`));
console.log(chalk.blueBright(`Waiting for your requests now.....: ${new Date()}\n`));
});