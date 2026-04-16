const validator = require('../util/studentValidation');

module.exports = (req, res, nxt) => {
  const valid = validator(req.body);
  if (valid) {
    req.valid = true;
    nxt();
  } else {
    res.status(403).send('Invalid inputs');
  }
}