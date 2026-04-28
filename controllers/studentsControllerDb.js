const Student = require('../models/studentModelDb')
const asyncHandler = require('../middlewares/async')

//create student
exports.addNewStudent = asyncHandler(async (req, res) => {
  const length = await Student.find().countDocuments();
  const std = new Student({
    ...req.body,
    id: length + 1
  })

  std.save().then(() => res.send('Student added successfully!'))
})

//get student by id
exports.getStudentById = asyncHandler(async (req, res) => {
  const std = await Student.findById(req.params.id);

  if (!std) res.status(404).send("Student not found!");
  else res.send(std);
})

//get all students
exports.getAllStudents = asyncHandler(async (req, res) => {
  let std = await Student.find().sort({ id: 1 });
  res.send(std);
})

//update student
exports.updateStudent = asyncHandler(async (req, res) => {
  const std = await Student.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' })

  if (!std) res.status(404).send('Student not found!');
  else res.send(std);
})

//delete student
exports.deleteStudent = asyncHandler(async (req, res) => {
  const std = await Student.findByIdAndDelete(req.params.id);

  if (!std) res.status(404).send('Student not found!');
  else res.send(std);
})