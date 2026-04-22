const Ajv = require('ajv');
const ajvErrors = require('ajv-errors');

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);

const loginSchema = {
  type: "object",
  properties: {
    email: {
      type: 'string',
      pattern: '^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$',
      errorMessage: {
        type: "Email must be in string formate.",
        pattern: "Please enter a valid email address."
      }
    },
    password: {
      type: 'string',
      errorMessage: {
        type: "Password must be in string formate.",
      }
    }
  },
  required: ["email", "password"],
  additionalProperties: false,
  errorMessage: {
    required: {
      email: 'Email is required.',
      password: 'Password is required.'
    }
  }
}

module.exports = ajv.compile(loginSchema);