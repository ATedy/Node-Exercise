const {getStudents} = require("./students");

const students = getStudents();

const express = require("express");
const {response} = require("express");

const app = express();

//when server is ready it calls the callback function
app.listen(3000, function () {
  console.log("Running on port 3000 and listening");
});

app.get("/profiles/:name/image", (req, res) => {
  let username = req.params.name;

  let size = req.query.size;
  //if no queries giving
  if (!size) {
    size = "large";
  }

  switch (size) {
    case "small":
    case "large":
      res.sendFile(__dirname + `/images/${username}-${size}.jpg`);
      break;
    default:
      res.sendStatus(404);
      break;
  }
});

app.get("/profiles/:name", (req, res) => {
  let username = req.params.name;

  const student = students.find((student) => student.username === username);
  if (!student) {
    res.sendStatus(404);
    return;
  }
  res.json(student);
});

// app.get("/profiles/eric", (req, res) => {
//   //we are sending a res to the server from the students array
//   const student = students.find((student) => student.username === "eric");
//   res.json(student);
// });

app.get("/profiles", (req, res) => {
  const newExtendedStudents = students.map((student) => {
    student["largeImage"] = `/profiles/${student.username}/image?size=large`;
    student["smallImage"] = `/profiles/${student.username}/image?size=small`;
    student["profile"] = `/profiles/${student.username}`;
    return student;
  });
  res.json(newExtendedStudents);
});
