const path = require("path");
const fs = require("fs");

const addStudent = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "views", "form.html"));
};

const student = (req, res) => {
  const {
    body: { firstName, age },
  } = req;

  const fileData = JSON.parse(fs.readFileSync("./data.json").toString());
  const old_id = parseInt(fileData[fileData.length - 1].id);

  const studentObject = {
    id: old_id + 1,
    name: firstName,
    age: parseInt(age),
  };
  fileData.push(studentObject);
  const newData = JSON.stringify(fileData);
  fs.writeFileSync("./data.json", newData);
  res.redirect("/");
};

const deleteStudent = (req, res) => {
  const { id } = req.body;
  console.log("Delete id =>", id);

  const fileData = JSON.parse(fs.readFileSync("./data.json").toString());

//   const new_data = fileData.reduce((acc, obj) => {
//     acc += obj.id !== id ;
//     return acc;
//   }, {});
//   console.log(new_data);

  res.status(200).send("<h1>Delete student</h1>");
};

module.exports = {
  addStudent,
  student,
  deleteStudent,
};

