const jwt = require('jsonwebtoken');
//const { token } = require('morgan');
require('dotenv').config();

const secret = process.env.JWTSECRET || 'rnfr45j85r4jfjrruf48rj';



module.exports.genjwt = (payload,expiresIn = '1h') =>{

    return jwt.sign(payload,secret,{expiresIn});

};

module.exports.verjwt = (token) =>{

    try{
        return jwt.verify(token,secret);


    }
    catch(err){

        return null;
     }
};



