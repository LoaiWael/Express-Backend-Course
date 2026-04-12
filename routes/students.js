const express = require("express");
const studentsController = require("../controllers/studentsControllerDb");
const studentIdValidation = require("../middlewares/studentIdValidation");
const addStudentValidator = require("../middlewares/addStudentValidation");

const router = express.Router();

router.get("/", studentsController.getAllStudents);

//post students
router.post("/", addStudentValidator, studentsController.addNewStudent);

//id param middleware
router.param("id", studentIdValidation);

//del student
router.delete("/:id", studentsController.deleteStudent);

//put student
router.put("/:id", studentsController.updateStudent);

router.get("/:id", studentsController.getStudentById);

module.exports = router;
