import express from "express";
const router=express.Router();

const projectControllers=require("../controllers/project");
const {requireSignIn}=require("../middlewares/requireSignin");

router.post("/add",requireSignIn,projectControllers.addProject);

router.post("/edit/:id",projectControllers.editProject);

export {router};