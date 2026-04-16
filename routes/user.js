const express = require('express');
const userValidator = require('../middlewares/userValidation');
const User = require('../models/userModel');

const router = express.Router();

// Registration
router.post('/', userValidator, async (req, res) => {
  //check if exists
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (user) {
      res.status(400).send('User already exists.')
    }
    else {
      const newUser = new User(req.body);
      newUser.save().then(() => res.send('Account created successfully!')).catch(err => res.status(400).send('Error while creating the account.'));
    }
  }
  catch (err) {
    err.errors.foreach(err => {
      console.log(err.message);
      res.status(400).send('Bad request!')
    })
  }
})

module.exports = router