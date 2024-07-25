const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res, next) => {
  const file = fs.readFileSync("./data.json").toString();
  const fileData = JSON.parse(file);

  const printData = () => {
    return fileData
      .map((element) => {
        return `
        <tr>
          <td>${element.id}</td>
          <td>${element.name}</td>
          <td>${element.age}</td>
          <td>
            <button type="submit" name="id" value="${element.id}" formaction="/edit" formmethod="POST">EDIT</button>
            <button type="submit" name="id" value="${element.id}" formaction="/admin/deleteStudent" formmethod="POST">DELETE</button>
          </td>
        </tr>
      `;
      })
      .join(""); // Join array elements into a single string
  };

  // console.log("List students");
  // @TODO read the student json and list them here
  res.send(`
    <html>
    <head><title>CRUD</title></head>
    <body>
      <h3>Students Data</h3>
      <form>
        <button type="submit" formaction="/admin/addStudent" method="GET">Add Student</button><br><br>
        <table border="2">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${printData()}
          </tbody>
        </table>
      </form>
    </body>
    </html>
  `);
});

router.get("/listStudents", (req, res) => {
  // read the file
  // parse the data
  // send it
  res.json({
    data: [
      { id: 1, name: "shibu" },
      { id: 2, name: "Parth" },
    ],
  });
});

module.exports = router;
