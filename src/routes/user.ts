import express from "express";
const router = express.Router();

const projectControllers = require("../controllers/project");
const {requireSignIn}=require("../middlewares/requireSignin");
const roleControllers = require("../controllers/role");
const userControllers = require("../controllers/user");

router.post("/signup", userControllers.signup);
router.post("/signin", userControllers.signin);

router.get("/projectList",requireSignIn, projectControllers.listProject);
router.get("/roleList", roleControllers.listRole);

router.get("/singleProject/:id",requireSignIn, projectControllers.findProject);

export {router};
