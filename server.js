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
  let size = req.query.size;
  if (!size) {
    res.sendFile(__dirname + `/images/eric-large.jpg`);
  }
  switch (size) {
    case "small":
    case "large":
      res.sendFile(__dirname + `/images/eric-${size}.jpg`);
      break;
    // default:
    //   res.sendStatus(404);
    //   break;
  }

  // res.sendFile(__dirname + `/images/eric-${size}.jpg`);
});
