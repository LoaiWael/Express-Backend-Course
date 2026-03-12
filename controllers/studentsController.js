const validateAddNew = require("../util/studentValidation");

const students = [
  { id: 1, name: "loai", age: 21, dep: "cs" },
  { id: 2, name: "mohamed", age: 19, dep: "cs" },
  { id: 3, name: "sellem", age: 20, dep: "it" },
  { id: 4, name: "fares", age: 20, dep: "is" },
];

exports.getAllStudents = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.json(students);
};

exports.addNewStudent = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const valid = validateAddNew(req.body);
  if (valid) {
    req.body.id = students.length + 1;
    students.push(req.body);
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
};

exports.deleteStudent = (req, res) => {
  const i = students.findIndex((std) => std.id == req.params.id);
  students.splice(i, 1);
  res.sendStatus(200);
};

exports.updateStudent = (req, res) => {
  const i = students.findIndex((val) => val.id == req.params.id);
  if (i) {
    students[i] = { ...students[i], ...req.body };
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};

exports.getStudentById = (req, res) => {
  const { id } = req.params;
  const std = students.find((val, i, arr) => val.id == id);

  std ? res.json(std) : res.status(404).send("Student not found");
};
