import express from "express";
const router=express.Router();

const projectControllers=require("../controllers/project");
const roleControllers=require("../controllers/role");

router.post("/add",roleControllers.addRole);


export {router};