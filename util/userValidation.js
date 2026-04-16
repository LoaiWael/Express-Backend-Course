const Ajv = require('ajv');

const ajv = new Ajv();

const registerSchema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    email: {
      type: 'string',
      pattern: '^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$'
    },
    password: {
      type: 'string',
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
    }
  },
  required: ["name", "email", "password"],
  maxProperties: 3,
  minProperties: 3
}

module.exports = ajv.compile(registerSchema);