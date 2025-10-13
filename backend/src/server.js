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

const app = express();
dotenv.config();


app.use(express.json());
app.use('/api/users',userrouter);


//deb test


try{
  await sequelize.authenticate();
  await sequelize.sync({alter:true});
  console.log('Models synced');

  console.log('Connected to Database now');

}
catch(err){

  console.log('Nuh could not connect to db');


}



const port = 3000 || process.env.PORT;



app.get('/api/v1', (req,res)=>{
  res.end('Welcome to afyalink api Version one');
})









































app.listen(port,()=>{
console.log(`Server running on port ${port}......`);
});