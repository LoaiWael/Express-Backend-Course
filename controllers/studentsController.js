const {
  validateAddStudent,
  validateUpdateStudent,
} = require("../util/studentValidation");
const Student = require("../models/studentModel");

exports.getAllStudents = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.json(await Student.getAllStudents());
};

exports.addNewStudent = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const valid = validateAddStudent(req.body);
  if (valid) {
    new Student(req.body);
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
};

exports.deleteStudent = async (req, res) => {
  const deleted = await Student.deleteStudent(req.params.id)
  if (deleted) res.sendStatus(200);
  else res.sendStatus(404);
};

exports.updateStudent = async (req, res) => {
  const valid = validateUpdateStudent(req.body);
  if (valid) {
    const updated = await Student.updateStudent(req.body, req.params.id)
    if (updated) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } else res.sendStatus(403);
};

exports.getStudentById = async (req, res) => {
  const std = await Student.getStudentById(req.params.id);
  std ? res.json(std) : res.status(404).send("Student not found");
};
