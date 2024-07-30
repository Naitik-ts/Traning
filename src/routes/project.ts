import express from "express";
const router = express.Router();

import { addProject, editProject } from "../controllers/project";
import  {requireSignIn}  from "../middlewares/requireSignin";

router.post("/add", requireSignIn, addProject);

router.post("/edit/:id", editProject);

export { router };