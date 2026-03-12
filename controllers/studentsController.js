const {
  validateAddStudent,
  validateUpdateStudent,
} = require("../util/studentValidation");
const Student = require("../models/studentModel");

exports.getAllStudents = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.json(Student.getAllStudents);
};

exports.addNewStudent = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const valid = validateAddStudent(req.body);
  if (valid) {
    new Student(req.body);
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
};

exports.deleteStudent = (req, res) => {
  if (Student.deleteStudent(req.params.id)) res.sendStatus(200);
  else res.sendStatus(404);
};

exports.updateStudent = (req, res) => {
  const valid = validateUpdateStudent(req.body);
  if (valid) {
    if (Student.updateStudent(req.body, req.params.id)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } else res.sendStatus(403);
};

exports.getStudentById = (req, res) => {
  const std = Student.getStudentById(req.params.id);
  std ? res.json(std) : res.status(404).send("Student not found");
};
