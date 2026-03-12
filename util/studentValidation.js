const Ajv = require("ajv");

const ajv = new Ajv();

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

module.exports = ajv.compile(addNewSchema);
