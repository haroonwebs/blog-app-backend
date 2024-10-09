import nodemailer from 'nodemailer'
import dotenv from "dotenv"


dotenv.config();

export const sendVerifyMail = async (name, email) => {
   try {

     const sender = nodemailer.createTransport({
       host: "smtp.gmail.com",
       port: 587,
       secure: false,
       auth: {
         user: process.env.EMAIL,
         pass: process.env.EMAIL_PASS,
       },
     });

     const options = {
       from: "haroon8028@gmail.com",
       to: email,
       subject: "Register User",
       text: `Hello ${name} You are successfully registered to this platform `,
     };

     sender.sendMail(options, function (error, info) {
       if (error) {
         console.log("something error while sending email", error);
       } else {
         console.log("email sent successfully", info.response);
       }
     });
     
   } catch(error) {
    console.log(error)
   }
}