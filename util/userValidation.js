const Ajv = require('ajv');
const ajvErrors = require('ajv-errors');

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);

const registerSchema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
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
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
      errorMessage: {
        type: "Password must be in string formate.",
        pattern: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
      }
    }
  },
  required: ["name", "email", "password"],
  additionalProperties: false,
  errorMessage: {
    required: {
      name: 'Name is required.',
      email: 'Email is required.',
      password: 'Password is required.'
    }
  }
}

module.exports = ajv.compile(registerSchema);