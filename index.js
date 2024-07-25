const express = require("express");
const bodyParser = require("body-parser");
const studentRoute = require("./routes/student");
const adminRoute = require("./routes/admin");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(studentRoute);
app.use("/admin", adminRoute);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
