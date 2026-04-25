const mongoose = require('mongoose');
const valid = require('validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
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
      validator: (val) => valid.isStrongPassword(val, { minSymbols: 0 }),
      message: 'Password is not strong enough.'
    }
  },
  isAdmin: {
    type: Boolean,
    required: true
  }
});

userSchema.methods.genAuthToken = function () {
  const token = jwt.sign({
    userId: this._id,
    isAdmin: this.isAdmin
  }, config.get('jwtsecret'));

  return token
}

module.exports = mongoose.model('User', userSchema, 'User')