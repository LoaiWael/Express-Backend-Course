const express = require('express');
const authValidator = require('../middlewares/authValidation');
const asyncHandler = require('../middlewares/async');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const config = require('config');

const router = express.Router();

// login
router.post('/', authValidator, asyncHandler(async (req, res) => {
  //check email
  const user = await User.findOne({ email: req.body.email }).exec();
  if (!user) return res.status(400).send('Invalid email or password.');

  //check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid email or password.');

  // check env var
  if (!config.get('jwtsecret')) return res.status(500).send('Token can\'t be genrated');

  //send res
  const token = user.genAuthToken()

  res.header('x-auth-token', token)
  res.status(200).send('Loggedin successfully.');
}))

module.exports = router;
