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
import sequelize from './config/db/orm/sequalize.js';
import userrouter from './routes/authRoutes.js';
import adminroute from './routes/adminroute.js';
import redis from './config/redis/redis.js';

const app = express();
dotenv.config();


app.use(express.json());
app.use('/api/users',userrouter);
app.use('/api/users/admin',adminroute);


//redis test

try{

  console.log('Connecting to redis server...')

  await redis.set('ping','pong');
  const dated = await redis.get('ping');
  if(dated)  console.log('Connected to redis........')

}
catch(err){
  console.log(`Could not connect to redis ${err.message}`);
}











//deb test


try{
  console.log('Connecting to database.....')
  await sequelize.authenticate();
  await sequelize.sync({alter:false});
  console.log('Models synced');

  console.log('Connected to Database now');

}
catch(err){

  console.log('Nuh could not connect to db');
  console.log(err.message);


}








const port = 3000 || process.env.PORT;



app.get('/api/v1', (req,res)=>{
  res.status(200).json({message: 'Welcome to afyalink api. Here are  the endpoints',
    endpoints:{
     users:[ 'POST users/sigunp',
      'POST /users/signin',
      'GET users/:id',
      'POST /users/forgotpass',
      'PUT users/resetpass',
      'POST users/verify/email',
      'GET users/admin/auth',
      'GET users/admin/dashboard'


     ]
    }
  });



})









































app.listen(port,()=>{
console.log(`Backend Server running on port ${port}......`);
console.log('Waiting for your requests now.....');
});