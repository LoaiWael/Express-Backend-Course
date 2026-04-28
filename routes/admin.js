const express = require('express');
const roleCheck = require('../middlewares/authrizationMW');
const User = require('../models/userModel')
const asyncHandler = require('../middlewares/async')

const router = express.Router();

router.put('/:id', roleCheck, asyncHandler(async (req, res) => {
  const data = await User.findByIdAndUpdate(req.params.id, { isAdmin: true }, { returnDocument: 'after' });
  if (data) res.status(200).send('User role updated.');
  else res.status(404).send('User not found.');
}))

module.exports = router;