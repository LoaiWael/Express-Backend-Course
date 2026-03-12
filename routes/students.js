const express = require("express");
const Ajv = require("ajv");

const router = express.Router();
const ajv = new Ajv();

const students = [
  { id: 1, name: "loai", age: 21, dep: "cs" },
  { id: 2, name: "mohamed", age: 19, dep: "cs" },
  { id: 3, name: "sellem", age: 20, dep: "it" },
  { id: 4, name: "fares", age: 20, dep: "is" },
];

const addNewSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number" },
    dep: { type: "string", enum: ["cs", "is", "it"] },
  },
  required: ["name", "age", "dep"],
  maxProperties: 3,
  minProperties: 3,
};

const validateAddNew = ajv.compile(addNewSchema);

router.get("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.json(students);
});

//post students
router.post("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const valid = validateAddNew(req.body);
  if (valid) {
    req.body.id = students.length + 1;
    students.push(req.body);
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

//id param middleware
router.param("id", (req, res, nxt, val) => {
  if (Number(val)) {
    nxt();
  } else {
    res.status(403).send("Invalide id");
  }
});

//del student
router.delete("/:id", (req, res) => {
  const i = students.findIndex((std) => std.id == req.params.id);
  students.splice(i, 1);
  res.sendStatus(200);
});

//put student
router.put("/:id", (req, res) => {
  const i = students.findIndex((val) => val.id == req.params.id);
  if (i) {
    students[i] = { ...students[i], ...req.body };
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const std = students.find((val, i, arr) => val.id == id);

  std ? res.json(std) : res.status(404).send("Student not found");
});

module.exports = router;
