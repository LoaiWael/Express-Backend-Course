const { log } = require("node:console");
const path = require("node:path");
const express = require("express");
const cookieParser = require("cookie-parser");
const Ajv = require("ajv");

const app = express();

app.use((req, res, nxt) => {
  log("Logging...");
  nxt();
});

const ajv = new Ajv();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static("public"));
app.use(cookieParser());

const port = process.env.port || 3000;
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

app.get("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.sendFile(path.join(__dirname, "/index.html"), (err) => console.log(err));
});

app.get("/welcome.html", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log("Query: ", req.query);
  res.send(`Welcome ${req.query.fName} ${req.query.lName} using get`);
});

app.post("/welcome.html", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log("Body: ", req.body);

  const fName = Buffer.from(req.body.fName).toString("base64");

  res.cookie("name", fName, { maxAge: 100000000, httpOnly: true });
  res.send(`Welcome ${req.body.fName} ${req.body.lName} using post`);
});

app.get("/abc", (req, res) => {
  log(Buffer.from(req.cookies.name, "base64").toString());
  res.sendStatus(200);
});

app.get("/api/students", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.json(students);
});

//post students
app.post("/api/students", (req, res) => {
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

//del student
app.delete("/api/students/:id", (req, res) => {
  const i = students.findIndex((std) => std.id == req.params.id);
  students.splice(i, 1);
  res.sendStatus(200);
});

//put student
app.put("/api/students/:id", (req, res) => {
  const i = students.findIndex((val) => val.id == req.params.id);
  if (i) {
    students[i] = { ...students[i], ...req.body };
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.get("/api/students/:id", (req, res) => {
  const { id } = req.params;
  const std = students.find((val, i, arr) => val.id == id);

  std ? res.json(std) : res.send("Student not found");
});

app.listen(port, () => console.log(`Listening to port ${port}!`));
