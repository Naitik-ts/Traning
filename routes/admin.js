const express = require("express");
const router = express.Router();
const {addStudent,deleteStudent, student}=require('../controllers/admin');

router.get("/addStudent",addStudent);

router.post("/student", student);

router.post("/deleteStudent",deleteStudent);

module.exports = router;
