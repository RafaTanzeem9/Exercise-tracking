const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { validateUser } = require("../utiles/validations");

const registerUser = async (req, res) => {
  try {
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    try {
      await validateUser.validateAsync(data);
      const userExist = await User.findOne({ email: req.body.email });
      if (userExist)
        return res
          .status(400)
          .send({ message: "user already existed with this email" });
      data.password = await bcrypt.hash(req.body.password, 8);
      const user = await User.create(data);
      return res.status(200).send({ message: "user created", user });
    } catch (err) {
      return res.send(err.details);
    }
  } catch (err) {
    return res.status(500).send({ message: "server error", error: err });
  }
};

const loginUser = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.find({ email: req.body.email });
    console.log(user);
    if (!user)
      return res
        .status(404)
        .send({ message: "user not existed with this email" });
    console.log("check");
    if (await bcrypt.compare(req.body.password, user.password))
      return res.status(200).send({ message: "user logedIn", user });

    // console.log("check2", check);
    return res.status(400).send({ message: "wrong password" });
  } catch (err) {
    res.status(500).send({ message: "server error", error: err });
  }
};
module.exports = { registerUser, loginUser };
