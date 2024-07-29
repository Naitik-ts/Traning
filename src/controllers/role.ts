const Project = require("../models/project");
const Role = require("../models/role");
const { v4: uuidv4 } = require("uuid");

exports.addRole = async (req, res) => {
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

  const roleData = await Role({
    roleId,
    ...req.body,
  }).save();

  res.json({ status: 200, message: "Data Inserted" });
};

exports.listRole = async (req, res) => {
  const roles = await Role.find();
  res.json({ status: 200, message: roles });
};
