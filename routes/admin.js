const express = require('express');
const roleCheck = require('../middlewares/authrizationMW');
const User = require('../models/userModel')

const router = express.Router();

router.put('/:id', roleCheck, async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id, { isAdmin: true }, { returnDocument: 'after' });
    if (data) res.status(200).send('User role updated.');
    else res.status(404).send('User not found.');
  }
  catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router;