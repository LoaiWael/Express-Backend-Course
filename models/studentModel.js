const { log } = require("node:console");
const fs = require("node:fs");
const path = require("node:path");
const studentsFilePath = path.join(path.dirname(require.main.filename), 'data', 'students.json')

module.exports = class Student {
  constructor(obj) {
    fs.readFile(studentsFilePath, (err, data) => {
      let students = [];
      if (err) {
        log(err);
        return;
      }
      students = [...JSON.parse(data)];
      students.push({
        ...obj,
        id: students.length + 1,
      });
      fs.writeFile(studentsFilePath, JSON.stringify(students), (err) => {
        if (err) log(err);
      });
    });
  }
  static async getAllStudents() {
    try {
      const students = await fs.promises.readFile(studentsFilePath);
      return JSON.parse(students)
    } catch (err) {
      log(err);
      return [];
    }
  }
  static async deleteStudent(id) {
    const data = await fs.promises.readFile(studentsFilePath);
    const students = JSON.parse(data);
    const i = students.findIndex((std) => std.id == Number(id));
    if (i !== -1) {
      students.splice(i, 1);
      fs.writeFile(studentsFilePath, JSON.stringify(students), (err) => {
        if (err) log(err);
      });
      return true;
    } else {
      return false;
    }
  }
  static async updateStudent(data, id) {
    const studentsData = await fs.promises.readFile(studentsFilePath);
    const students = JSON.parse(studentsData);
    const i = students.findIndex((val) => val.id == Number(id));
    if (i) {
      students[i] = { ...students[i], ...data };
      await fs.promises.writeFile(studentsFilePath, JSON.stringify(students));
      return true;
    } else return false;
  }
  static async getStudentById(id) {
    const data = await fs.promises.readFile(studentsFilePath);
    const students = JSON.parse(data);
    return students.find((val, i, arr) => val.id == Number(id));
  }
};
