const { log } = require("node:console");
const path = require("node:path");
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoose = require('mongoose');
const studentsRouter = require("./routes/students");
const logging = require("./middlewares/logging");

const app = express();

app.use(logging);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static("public"));
app.use(cookieParser());
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/mahara-tech').then(() => log('Connected to the Database.')).catch(err => log(err))

app.use("/api/students", studentsRouter);

const port = process.env.port || 3000;

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

app.listen(port, () => console.log(`Listening to port ${port}!`));
