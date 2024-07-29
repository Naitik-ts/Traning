import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new Schema({
  projectId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: "draft", //active,draft    // only owner can edit
  },
  createdBy: {
    type: String,
  },
  releaseDate: {
    type: String,
    default: "2025/05/05",
  },
});

export const Project = mongoose.model("Project", projectSchema);
