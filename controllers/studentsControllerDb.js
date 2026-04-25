const Student = require('../models/studentModelDb')

//create student
exports.addNewStudent = async (req, res) => {
  const length = await Student.find().countDocuments();
  const std = new Student({
    ...req.body,
    id: length + 1
  })

  std.save().then(() => res.send('Student added successfully!')).catch(err => {
    console.log(err)
    res.status(400).send('Bad Request, try again later.');
  })
}

//get student by id
exports.getStudentById = async (req, res) => {
  try {
    const std = await Student.findById(req.params.id);

    if (!std) res.status(404).send("Student not found!");
    else res.send(std);
  }
  catch (err) {
    err.errors.foreach(err => {
      console.log(err.message)
      res.status(400).send('Bad Request, try again later.');
    })
  }
}

//get all students
exports.getAllStudents = async (req, res) => {
  try {
    let std = await Student.find().sort({ id: 1 });
    res.send(std);
  }
  catch (err) {
    err.errors.foreach(err => {
      console.log(err.message)
      res.status(400).send('Bad Request, try again later.');
    })
  }
}

//update student
exports.updateStudent = async (req, res) => {
  try {
    const std = await Student.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' })

    if (!std) res.status(404).send('Student not found!');
    else res.send(std);
  } catch (err) {
    err.errors.foreach(err => {
      console.log(err.message)
      res.status(400).send('Bad Request, try again later.');
    })
  }
}

//delete student
exports.deleteStudent = async (req, res) => {
  try {
    const std = await Student.findByIdAndDelete(req.params.id);

    if (!std) res.status(404).send('Student not found!');
    else res.send(std);
  } catch (err) {
    err.errors.foreach(err => {
      console.log(err.message)
      res.status(400).send('Bad Request, try again later.');
    })
  }
}