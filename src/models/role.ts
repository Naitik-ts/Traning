import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  roleId: {
    type: String,
    required: true,
    unique: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  roleName: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
});

export const Role = mongoose.model("Role", roleSchema);
