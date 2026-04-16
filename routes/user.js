const express = require('express');
const userValidator = require('../middlewares/userValidation');

const router = express.Router();

// Registration
router.post('/', userValidator, (req, res) => {

})

module.exports = router