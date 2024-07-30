"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProject = exports.findProject = exports.editProject = exports.addProject = void 0;
// const Project = require("../models/project");
const project_1 = require("../models/project");
const uuid_1 = require("uuid");
const addProject = async (req, res) => {
    const { email, role, userId } = req.payload || {};
    if (role !== "CD")
        return res
            .status(403)
            .send("You are not  Casting Director , so you can create Project");
    const { body: { title, description, releaseDate, status }, } = req;
    if (!title || !description || !releaseDate) {
        return res.json({ status: 422, message: "All fields are required" });
    }
    const projectId = (0, uuid_1.v4)();
    const projectData = new project_1.Project({
        projectId,
        createdBy: userId,
        ...req.body,
    }).save();
    res.json({ status: 200, message: "Data Inserted" });
};
exports.addProject = addProject;
const editProject = async (req, res) => {
    const { body: { title, description, releaseDate }, } = req;
    const { id } = req.params;
    if (!id) {
        return res.json({ status: 422, message: "Project Id is required" });
    }
    const originalProject = await project_1.Project.findById(id);
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
    const data = await project_1.Project.findOneAndUpdate({ _id: id }, projectData, {
        new: true,
    }).exec();
    res.json({ status: 200, data });
};
exports.editProject = editProject;
const findProject = async (req, res) => {
    const { id } = req.params;
    const { userId, email, role } = req.payload || {};
    if (role !== "CD")
        return res
            .status(403)
            .send("You are not  Casting Director , so you can see all your Project");
    if (!id) {
        return res.json({ status: 422, message: "Project Id is required" });
    }
    const originalProject = await project_1.Project.findById(id);
    if (!originalProject)
        return res.json({
            status: 422,
            message: "Project not Found , Id is Wrong",
        });
    return res.json({ status: 200, data: originalProject });
};
exports.findProject = findProject;
const listProject = async (req, res) => {
    const { userId, email, role } = req.payload || {};
    if (role !== "CD")
        return res
            .status(403)
            .send("You are not  Casting Director , so you can see all your Project");
    const allProjectsofSingleUser = await project_1.Project.find({ createdBy: userId });
    if (!allProjectsofSingleUser)
        return res.status(403).send(`No projects created by this ${email}`);
    res.json({ status: 200, allProjectsofSingleUser });
};
exports.listProject = listProject;
