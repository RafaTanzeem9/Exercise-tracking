const User = require("../../models/user.model");
const generateToken = require("../../utils/generateTokens");
const transporter = require("../../../config/nodemailer");
const { validateUser } = require("../../middlewares/front/validations");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    user.logIn();
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      age: user.age,
      token: user.token,
    });
  } else {
    res.status(401).send("invalid auth");
  }
};
const registerUser = async (req, res) => {
  await validateUser.validateAsync(req.body);
  console.log("register", req.body, req.file);
  const { name, email, password, age, address } = req.body;
  const { filename } = req.file;
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400).send("user already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    age,
    address,
    image: `http://localhost:8080/images/${filename}`,
  });
  if (true) {
    res.status(201).send("sdsads");
  } else {
    res.status(400).send("invalid user data");
  }
};

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log("profile", user);
  if (user) {
    res.json({
      user,
    });
  } else {
    res.status(404).send("profile failed");
  }
};

const refreshToken = async (req, res) => {
  const refreshToken = req.headers.authorization.split(" ")[1];
  try {
    var decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    user.token = generateToken(user._id, "1h");

    if (user.refreshToken === refreshToken) {
      res.json({
        token: user.token,
      });
    } else {
      res.status(401);
      throw new Error("invalid auth token");
    }
  } catch (err) {
    // err
    if (err.message === "jwt expired") {
      const user = User.findOne({ refreshToken: refreshToken }).exec();
      user.token = undefined;
      user.refreshToken = undefined;
      user.save();
      res.send("loggedout");
    }
    res.json(err);
  }
};

const userLogout = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select("-password");
  if (user) {
    user.token = undefined;
    user.save();
    res.send("logout successful");
  } else {
    res.status(401).send("logout failed");
  }
};
const getUser = async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
};

const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("myuser", user);

    if (!user) {
      return res
        .status(404)
        .send({ message: "User Not found with this email account" });
    }

    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "180s",
    });

    const mailOptions = {
      from: "rafa.tanzeem@piecyfer.com",
      to: `${user.email || req.body.email}`,
      subject: "forgot password",
      html: `<p>go on this api to reset your password : http://localhost:3000/resetPassword/${token} <br/> Note: it will expire in 3mins</p>`,
    };

    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }
      consolee.log("sent" + info.response);
    });

    res.send({ message: "mail has been sent to your email account", token });
  } catch (err) {
    res.status(404).send({ message: err });
  }
};

const resetPassword = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  console.log("restpasswor", user);
  if (!user) {
    return res.status(404).send("No user found with this email");
  }
  try {
    user = await User.updateOne(
      { id: user.id },
      {
        password: bcrypt.hashSync(req.body.password, 8),
      }
    );
    res.status(200).send({ message: "passsword updated successfully" });
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = {
  resetPassword,
  forgotPassword,
  authUser,
  getUserProfile,
  registerUser,
  refreshToken,
  userLogout,
  getUser,
};
