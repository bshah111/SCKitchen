const mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: {
  
      type: String,
      unique: true,
      required: [true, "username is required"]
  },
  password: {
      
      type: String,
      unique: false,
      validate: {
        validator: function(v) {
          return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(v);
        },
        message: props => `${props.value} is not a valid password`
      },
      required: [true, "password is required"]
  },
  email: {
    trim: true,
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },

  firstname: {
    type: String,
    unique: true,
    required: [true, "First name is required"]
},
lastname: {
  type: String,
  unique: true,
  required: [true, "Last name is required"]
},
orgname: {
  type: String,
  unique: true,
  required: [true, "Organization name is required"]
},
orgaddress: {
  type: String,
  unique: true,
  required: [true, "Organzation address is required"]
},
  admin: {
    type: Boolean,
    unique: false,
    required: true,
    default: false
},
  createdAt: {
      type: Date,
      default: Date.now()
  }
});

usersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

usersSchema.methods.validPassword = function(password, encrypted) {
    return bcrypt.compareSync(password, encrypted);
}

const User = mongoose.model("User", usersSchema);

module.exports = User;
