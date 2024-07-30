"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const project_1 = require("./routes/project");
const user_1 = require("./routes/user");
const role_1 = require("./routes/role");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
mongoose_1.default
    .connect("mongodb+srv://NaitikBagia:W2NAVAtQuGxToPv7@practice-ts.mupvlif.mongodb.net/")
    .then(() => {
    console.log("DB Connected");
    app.listen(3000);
})
    .catch((err) => console.log(err));
app.use("/project", project_1.router);
app.use("/role", role_1.router);
app.use(user_1.router);
