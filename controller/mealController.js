const db = require("../models");
const nodemailer = require("nodemailer");
// var smtpTransport = require('nodemailer-smtp-transport');

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

// const transport = nodemailer.createTransport(smtpTransport({
//   service: 'gmail',
//   host: 'smtp.gmail.com',
//   port: 587,
//   ignoreTLS: true,
//   secure: false,
//   auth: {
//     user: 'SCKitchen@gmail.com',
//     pass: 'duwomen24'
//   },
// }));

// const encryptedPassword = '126891c03fef8f5fc1e1d8714d82bb';
// var emailList = [];

// function pullEmails () {
//     // emailList.push(users.findmany({ users: (email) }))
//     emailList.push(API.findmany({}).select('email'))
// }

const transport = nodemailer.createTransport({
  service: 'Gmail',
  port: 587,
  secure: false,
  auth: {
    user: "SCKitchen1864@gmail.com",
    // pass: crypt.decrypt(encryptedPassword),
    pass: "duwomen24",
  },
});

const mailOptions = {
  from: '"Second Chance Kitchen" <SCKitchen1864@gmail.com>',
  // to: emailList,
  to: "sbarenz@mac.com",
  subject: "SC Kitchen has a new listing!",
  text: "Please come visit our website to see the new offering! Thanks much, SC Kitchen"
};


// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    db.Meal
      .find(req.query)
      .sort({ createdAt: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Meal
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log("here's the create stuff")
    transport.sendMail(mailOptions, function (error, info) {
      console.log("this is the transport business#1")
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
    // transport.sendEmail = (mailOptions) => {
    //   console.log("this is the transport business#1")
    //   if (error) {
    //     console.log(error);
    //   }
    //   console.log("this is the transport business#2");
    // };
    db.Meal
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Meal
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Meal
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
}