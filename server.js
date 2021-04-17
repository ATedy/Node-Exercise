const {getStudents} = require("./students");

const students = getStudents();

const express = require("express");

const app = express();

//when server is ready it calls the callback function
app.listen(3000, function () {
  console.log("Running on port 3000");
});
