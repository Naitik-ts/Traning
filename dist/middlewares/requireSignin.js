"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSignIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireSignIn = async (req, res, next) => {
    const auth = req.get("Authorization");
    if (!auth)
        return res.status(400).send("Please provide the Auth");
    const token = auth.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err)
            return res.status(400).send(err.message);
        // Check if decoded is a non-null object and has the properties you expect
        if (typeof decoded !== 'object' || decoded === null) {
            return res.status(401).send("Invalid token");
        }
        // Cast decoded to your expected JWT payload type
        const payload = decoded;
        // Now you can check the role
        if (req.baseUrl === "/project" && payload.role !== "CD") {
            return res.status(401).send("Only CD can access this route");
        }
        // Attach the payload to the request object
        req.payload = {
            email: payload.email,
            userId: payload.user,
            role: payload.role,
        };
        // Proceed to the next middleware
        next();
    });
};
exports.requireSignIn = requireSignIn;
