const express = require("express");
const studentsController = require("../controllers/studentsControllerDb");
const studentIdValidation = require("../middlewares/studentIdValidation");
const addStudentValidator = require("../middlewares/addStudentValidation");
const roleCheck = require('../middlewares/authrizationMW');

const router = express.Router();

router.get("/", studentsController.getAllStudents);

//post students
router.post("/", roleCheck, addStudentValidator, studentsController.addNewStudent);

//id param middleware
router.param("id", studentIdValidation);

//del student
router.delete("/:id", roleCheck, studentsController.deleteStudent);

//put student
router.put("/:id", studentsController.updateStudent);

router.get("/:id", studentsController.getStudentById);

module.exports = router;
