const Ajv = require("ajv");

const ajv = new Ajv();

const addNewStudentSchema = {
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

const updateStudentSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number" },
    dep: { type: "string", enum: ["cs", "is", "it"] },
  },
  maxProperties: 3,
};

const validateAddStudent = ajv.compile(addNewStudentSchema);
const validateUpdateStudent = ajv.compile(updateStudentSchema);

module.exports = { validateAddStudent, validateUpdateStudent };
