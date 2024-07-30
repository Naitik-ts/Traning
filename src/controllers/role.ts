import { Project } from "../models/project";
import { Role } from "../models/role";
import { v4 as uuidv4 } from "uuid";
import express, { Request, Response } from "express";

export const addRole = async (req: Request, res: Response) => {
  const {
    body: { projectId, roleName, description },
  } = req;

  if (!projectId || !description || !roleName) {
    return res.json({ status: 422, message: "All fields are required" });
  }

  const validProjectId = await Project.findOne({ projectId });
  if (!validProjectId)
    return res.json({ status: 422, message: "Project Not Found" });

  const roleId = uuidv4();

  const roleData = await new Role({
    roleId,
    ...req.body,
  }).save();

  res.json({ status: 200, message: "Data Inserted" });
};

export const listRole = async (req: Request, res: Response) => {
  const roles = await Role.find();
  res.json({ status: 200, message: roles });
};
