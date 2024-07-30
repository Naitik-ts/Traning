"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
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
exports.Project = mongoose_1.default.model("Project", projectSchema);
