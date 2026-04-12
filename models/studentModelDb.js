const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  age: {
    type: Number,
    min: 3,
    max: 25,
    required: true
  },
  dep: {
    type: String,
    enum: ['is', 'cs', 'it']
  },
  id: {
    type: Number,
    unique: true,
    required: true
  }
});

const Student = mongoose.model('Students', studentSchema, 'Students');

module.exports = Student;