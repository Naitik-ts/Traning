"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const project_1 = require("../controllers/project");
const requireSignin_1 = require("../middlewares/requireSignin");
router.post("/add", requireSignin_1.requireSignIn, project_1.addProject);
router.post("/edit/:id", project_1.editProject);
