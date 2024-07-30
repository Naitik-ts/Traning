"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_ts_1 = __importDefault(require("bcrypt-ts"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
exports.signup = async (req, res) => {
    const { body: { name, email, role, password }, } = req;
    //validate input data
    if (!name || !email || !role || !password)
        return res.status(400).send("All fields are required");
    //validate email:
    if (!validateEmail(email))
        return res.status(400).send("Email is not proper");
    //bcrypt password;
    const salt = await bcrypt_ts_1.default.genSalt(5);
    const passwordHash = await bcrypt_ts_1.default.hash(password, salt);
    //save to db
    const newUser = await new user_1.User({
        email,
        name,
        role,
        passwordHash,
    }).save();
    return res.status(200).send({ newUser });
};
exports.signin = async (req, res) => {
    const { body: { email, password }, } = req;
    //validate input data
    if (!email || !password)
        return res.status(400).send("All fields are required");
    //validate email:
    if (!validateEmail(email))
        return res.status(400).send("Email is not proper");
    try {
        //fetch from DB 
        const user = await user_1.User.findOne({ email }).exec();
        if (!user)
            return res.status(400).send("No user from this Email Id");
        const matchPassword = bcrypt_ts_1.default.compareSync(password, user.passwordHash);
        if (!matchPassword)
            return res.status(400).send("Password doesn't match");
        //create jwt token
        const jsonwebtoken = jsonwebtoken_1.default.sign({
            email,
            userId: user._id,
            role: user.role,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h",
        });
        res.cookie("Token", jsonwebtoken);
        return res.status(200).send({ jsonwebtoken });
    }
    catch (error) {
        console.log(error);
        return res.status(501).send("Error somewhere");
    }
};
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
