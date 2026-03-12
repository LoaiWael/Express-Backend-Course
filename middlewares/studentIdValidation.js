const studentIdValidation = (req, res, nxt, val) => {
  if (Number(val)) {
    nxt();
  } else {
    res.status(403).send("Invalide id");
  }
};

module.exports = studentIdValidation;
