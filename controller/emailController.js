// import React, {Component} from "react";
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

// const encryptedPassword = '126891c03fef8f5fc1e1d8714d82bb';
// var emailList = ["sbarenz@mac.com", "SCKitch1864@yahoo.com"];

// function pullEmails () {
//     // emailList.push(users.findmany({ users: (email) }))
//     emailList.push(API.findmany({}).select('email'))
// }

// const transport = nodemailer.createTransport({
//     host: "gmail",
//     port: 587,
//     secure: false,
//     auth: {
//         user: "SCKitchen1864@gmail.com",
//         // pass: crypt.decrypt(encryptedPassword),
//         pass: "duwomen24",
//     },
// });

const transport = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  ignoreTLS: true,
  secure: false,
  auth: {
    user: 'SCKitchen@gmail.com',
    pass: 'duwomen24'
  }
}));

// const encryptedPassword = '126891c03fef8f5fc1e1d8714d82bb';
// var emailList = [];

// function pullEmails () {
//     // emailList.push(users.findmany({ users: (email) }))
//     emailList.push(API.findmany({}).select('email'))
// }

// const transport = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: "SCKitchen1864@yahoo.com",
//         // pass: crypt.decrypt(encryptedPassword),
//         pass: "duwomen24",
//     },
// });

// 

function sendEmail() {
  const mailOptions = {
    from: '"Second Chance Kitchen" <SCKitchen1864@yahoo.com>',
    // to: emailList,
    to: "sbarenz@mac.com",
    subject: "SC Kitchen has a new listing!",
    text: "Please come visit our website to see the new offering! Thanks much, SC Kitchen"
  };

  transport.sendEmail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    }
    console.log("the email was sent...this is the transport.send stuff");
  });
}

// const sendEmail = transport.sendMail();

// export default sendEmail;

// export default transport.sendMail();