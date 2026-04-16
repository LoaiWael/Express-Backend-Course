const mongoose = require('mongoose');
const valid = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (val) => valid.isEmail(val),
      message: '{VALUE} is not a valid email.'
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (val) => valid.isStrongPassword(val),
      message: 'Password is not strong enough.'
    }
  }
});

module.exports = mongoose.model('User', userSchema, 'User')