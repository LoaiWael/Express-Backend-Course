const studentIdValidation = (req, res, nxt, val) => {
  if (/[a-f0-9]{24}/.test(val)) {
    nxt();
  } else {
    res.status(403).send("Invalide id");
  }
};

module.exports = studentIdValidation;
