const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const {
    body: { name, email, role, password },
  } = req;

  //validate input data
  if (!name || !email || !role || !password)
    return res.status(400).send("All fields are required");

  //validate email:
  if (!validateEmail(email)) return res.status(400).send("Email is not proper");

  //bcrypt password;
  const salt = await bcrypt.genSalt(5);
  const passwordHash = await bcrypt.hash(password, salt);

  //save to db
  const newUser = await new User({
    email,
    name,
    role,
    passwordHash,
  }).save();

  return res.status(200).send({ newUser });
};


exports.signin = async (req, res) => {
  const {
    body: { email, password },
  } = req;

  //validate input data
  if (!email || !password)
    return res.status(400).send("All fields are required");

  //validate email:
  if (!validateEmail(email)) return res.status(400).send("Email is not proper");

  try {
    //fetch from DB 
    const user = await User.findOne({ email }).exec();

    if (!user) return res.status(400).send("No user from this Email Id");

    const matchPassword = bcrypt.compareSync(password, user.passwordHash);
    if (!matchPassword) return res.status(400).send("Password doesn't match");

    //create jwt token
    const jsonwebtoken = jwt.sign(
      {
        email,
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("Token", jsonwebtoken);

    return res.status(200).send({ jsonwebtoken });

  } catch (error) {
    console.log(error);
    return res.status(501).send("Error somewhere");
  }
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
