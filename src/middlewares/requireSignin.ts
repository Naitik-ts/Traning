const jwt = require("jsonwebtoken");
const { deleteOne } = require("../models/project");

exports.requireSignIn = async (req, res, next) => {
  const auth = req.get("Authorization");
  //   console.log(auth);
  if (!auth) return res.status(400).send("Please provide the Auth");

  const token = auth.split(" ")[1];
  // console.log("Token is ->", token);

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(400).send(err);

    if (req.baseUrl === "/project" && decoded.role !== "CD") {
      return res.status(401).send("Only CD can access this route");
    }

    // console.log("Decoded values=>", decoded);
    req.payload = {
      email: decoded.email,
      userId: decoded.user,
      role: decoded.role,
    };
    next();
  });
};
