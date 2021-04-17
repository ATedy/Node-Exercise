const {getStudents} = require("./students");

const students = getStudents();

const express = require("express");
const {response} = require("express");

const app = express();

//when server is ready it calls the callback function
app.listen(3000, function () {
  console.log("Running on port 3000");
});

app.get("/profiles/eric", (req, res) => {
  //we are sending a res to the server from the students array
  const student = students.find((student) => student.username === "eric");
  res.json(student);
});

app.get("/profiles/eric/image", (req, res) => {
  res.sendFile(__dirname + "/images/eric-large.jpg");
});
