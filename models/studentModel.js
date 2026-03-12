const students = [
  { id: 1, name: "loai", age: 21, dep: "cs" },
  { id: 2, name: "mohamed", age: 19, dep: "cs" },
  { id: 3, name: "sellem", age: 20, dep: "it" },
  { id: 4, name: "fares", age: 20, dep: "is" },
];

module.exports = class Student {
  constructor(obj) {
    students.push({
      ...obj,
      id: students.length + 1,
    });
  }
  static get getAllStudents() {
    return students;
  }
  static deleteStudent(id) {
    const i = students.findIndex((std) => std.id == Number(id));
    if (i !== -1) {
      students.splice(i, 1);
      return true;
    } else {
      return false;
    }
  }
  static updateStudent(data, id) {
    const i = students.findIndex((val) => val.id == Number(id));
    if (i) {
      students[i] = { ...students[i], ...data };
      return true;
    } else return false;
  }
  static getStudentById(id) {
    return students.find((val, i, arr) => val.id == Number(id));
  }
};
