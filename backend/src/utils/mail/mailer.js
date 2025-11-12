import nodemailer from 'nodemailer';

import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport(
    {
        service : 'gmail',
        auth:{
            user: process.env.GMAIL,
            pass: process.env.MAIL_PASS
        }
    }
);






export const sendotpmail = async(toemail,otp) =>{

    const mailoptions = {
        from: `"Afyalink" <${process.env.GMAIL}>`,
        to: toemail,
        subject: 'Your Afyalink otp',
        html:`<p>Your OTP is <strong>${otp}</strong></p><p> This code will expire in 5 min and is for one time use only.<strong>  Even incorrect attempts are counted as times and code becomes invalid</strong></p>`

    };


    try{
        await transporter.sendMail(mailoptions);
        console.log(`otp send to ${toemail}`);
    }
    catch(err){

        console.log(err.message);
 }


};


//registration email

export const sendregmail = async (toemail,template) =>{
    const mailoptions = {
        from: `"Afyalink" <${process.env.GMAIL}>`,
        to: toemail,
        subject: "Afyalink registration",
        html: template
    };


    try{
        await transporter.sendMail(mailoptions);
        console.log(`   Registration details send to ${toemail}`);

    }
    catch(err){
        console.log(err.message);
    }

};

export const respasmail = async (toemail,template) =>{
    const mailoptions = {
        from: `"Afyalink" <${process.env.GMAIL}>`,
        to: toemail,
        subject: "Password Reset succesfully",
        html: template
    };


    try{


        await transporter.sendMail(mailoptions);
        console.log(`${toemail} has been notified of reset`);
    }
    catch(err){

        console.log(err.message);
    }


};


export const genmail = async(toemail,sub,template) =>{

    const mailoptions = {
        from: `"Afyalink" <${process.env.GMAIL}>`,
        to: toemail,
        subject: sub,
        html: template

    };

    try{
        await transporter.sendMail(mailoptions);
        console.log(`Dear ${toemail}  ${sub} `);
    }
    catch(err){
        console.log(err.message);

    }
}
