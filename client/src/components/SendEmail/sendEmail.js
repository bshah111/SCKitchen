const nodemailer = require('nodemailer');
const crypt = require('../../../../models/crypt');
const emailDB = require("../../../../models/Users");
const encryptedPassword = '126891c03fef8f5fc1e1d8714d82bb';
var emailList = [];

function pullEmails () {
    emailList.push(emailDB.findmany({ users: (email) }))
}

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'SCKitchen1864@gmail.com',
        pass: crypt.decrypt(encryptedPassword),
    },
});
function sendEmail() {
    pullEmails();
    const mailOptions = {
        from: 'SCKitchen1864@gmail.com',
        to: emailList,
        subject: "SC Kitchen has a new listing!",
        text: "Please come visit our website to see the new offering! Thanks much, SC Kitchen"
    };
    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        }
        // console.log(`Message sent: ${info.response}`);
    });
};

export default sendEmail;

//from W3 schools
// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'youremail@gmail.com',
//     pass: 'yourpassword'
//   }
// });

// var mailOptions = {
//   from: 'youremail@gmail.com',
//   to: 'myfriend@yahoo.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });