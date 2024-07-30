// const Project = require("../models/project");
import { Project } from "../models/project";
import { v4 as uuidv4 } from "uuid";
import express, { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { StringSchemaDefinition } from "mongoose";
// const { v4: uuidv4 } = require("uuid");


interface PayloadData extends Request {
  payload?: {
    email: string,
    role: string,
    userId: string
  }
}

export const addProject = async (req: PayloadData, res: Response) => {
  const { email, role, userId } = req.payload || {};

  if (role !== "CD")
    return res
      .status(403)
      .send("You are not  Casting Director , so you can create Project");

  const {
    body: { title, description, releaseDate, status },
  } = req;

  if (!title || !description || !releaseDate) {
    return res.json({ status: 422, message: "All fields are required" });
  }

  const projectId = uuidv4();

  const projectData = new Project({
    projectId,
    createdBy: userId,
    ...req.body,
  }).save();

  res.json({ status: 200, message: "Data Inserted" });
};

export const editProject = async (req: Request, res: Response) => {
  const {
    body: { title, description, releaseDate },
  } = req;

  const { id } = req.params;

  if (!id) {
    return res.json({ status: 422, message: "Project Id is required" });
  }

  const originalProject = await Project.findById(id);

  if (!originalProject)
    return res.json({
      status: 422,
      message: "Project not Found , ProjectId is Wrong",
    });

  const projectData = {
    title: title ? title : originalProject.title,
    description: description ? description : originalProject.description,
    releaseDate: releaseDate ? releaseDate : originalProject.releaseDate,
  };

  const data = await Project.findOneAndUpdate({ _id: id }, projectData, {
    new: true,
  }).exec();

  res.json({ status: 200, data });
};

export const findProject = async (req: PayloadData, res: Response) => {
  const { id } = req.params;

  const { userId, email, role }= req.payload || {};

  if (role !== "CD")
    return res
      .status(403)
      .send("You are not  Casting Director , so you can see all your Project");

  if (!id) {
    return res.json({ status: 422, message: "Project Id is required" });
  }

  const originalProject = await Project.findById(id);
  if (!originalProject)
    return res.json({
      status: 422,
      message: "Project not Found , Id is Wrong",
    });

  return res.json({ status: 200, data: originalProject });
};

export const listProject = async (req: PayloadData, res: Response) => {
  const { userId, email, role } = req.payload || {};

  if (role !== "CD")
    return res
      .status(403)
      .send("You are not  Casting Director , so you can see all your Project");

  const allProjectsofSingleUser = await Project.find({ createdBy: userId });

  if (!allProjectsofSingleUser)
    return res.status(403).send(`No projects created by this ${email}`);

  res.json({ status: 200, allProjectsofSingleUser });
};
