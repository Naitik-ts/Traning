"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const projectControllers = require("../controllers/project");
const { requireSignIn } = require("../middlewares/requireSignin");
const roleControllers = require("../controllers/role");
const userControllers = require("../controllers/user");
router.post("/signup", userControllers.signup);
router.post("/signin", userControllers.signin);
router.get("/projectList", requireSignIn, projectControllers.listProject);
router.get("/roleList", roleControllers.listRole);
router.get("/singleProject/:id", requireSignIn, projectControllers.findProject);
