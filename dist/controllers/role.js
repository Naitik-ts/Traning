"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRole = exports.addRole = void 0;
const project_1 = require("../models/project");
const role_1 = require("../models/role");
const uuid_1 = require("uuid");
const addRole = async (req, res) => {
    const { body: { projectId, roleName, description }, } = req;
    if (!projectId || !description || !roleName) {
        return res.json({ status: 422, message: "All fields are required" });
    }
    const validProjectId = await project_1.Project.findOne({ projectId });
    if (!validProjectId)
        return res.json({ status: 422, message: "Project Not Found" });
    const roleId = (0, uuid_1.v4)();
    const roleData = await new role_1.Role({
        roleId,
        ...req.body,
    }).save();
    res.json({ status: 200, message: "Data Inserted" });
};
exports.addRole = addRole;
const listRole = async (req, res) => {
    const roles = await role_1.Role.find();
    res.json({ status: 200, message: roles });
};
exports.listRole = listRole;
