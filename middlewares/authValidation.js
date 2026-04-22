const validator = require('../util/authValidation');

module.exports = (req, res, nxt) => {
  const valid = validator(req.body);

  if (valid) {
    req.valid = true;
    nxt();
  }
  else {
    res.status(400).send(validator.errors[0].message)
  }
}