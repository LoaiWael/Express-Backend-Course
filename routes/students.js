const express = require("express");
const studentsController = require("../controllers/studentsController");
const studentIdValidation = require("../middlewares/studentIdValidation");

const router = express.Router();

router.get("/", studentsController.getAllStudents);

//post students
router.post("/", studentsController.addNewStudent);

//id param middleware
router.param("id", studentIdValidation);

//del student
router.delete("/:id", studentsController.deleteStudent);

//put student
router.put("/:id", studentsController.updateStudent);

router.get("/:id", studentsController.getStudentById);

module.exports = router;
