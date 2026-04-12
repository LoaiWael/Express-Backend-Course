const { validateAddStudent } = require('../util/studentValidation');

const addStudentValidator = (req, res, nxt) => {
  const valid = validateAddStudent(req.body);
  if (valid) {
    req.valid = true;
    nxt();
  }
  else {
    res.status(403).send('Invalid properties.');
  }
}

module.exports = addStudentValidator;