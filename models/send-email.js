const nodemailer = require('nodemailer');
const crypt = require('./crypt');
const encryptedPassword = '126891c03fef8f5fc1e1d8714d82bb';
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'SCKitchen1864@gmail.com',
        pass: crypt.decrypt(encryptedPassword),
    },
});
module.exports = function sendEmail(to, subject, message) {
    const mailOptions = {
        from: 'SCKitchen1864@gmail.com',
        to,
        subject,
        html: message,
    };
    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        }
        // console.log(`Message sent: ${info.response}`);
    });
};



// const sendEmail = require('./send-email');
// function sendNotification(message) {
//     sendEmail('thisdavej@gmail.com, john@doe.com', 'Meals  available  notification', message);
//     console.log('Email sent');
// }