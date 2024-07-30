"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.Role = mongoose_1.default.model("Role", roleSchema);
