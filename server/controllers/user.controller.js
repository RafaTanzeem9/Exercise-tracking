const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { validateUser } = require("../utiles/validations");

const registerUser = async (req, res) => {
  try {
    const body = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    try {
      await validateUser.validateAsync(body);
      const userExist = await User.findOne({ email: req.body.email });
      if (userExist)
        return res
          .status(400)
          .send({ message: "user already existed with this email" });
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(req.body.password, salt);
      const user = await User.create(body);
      return res.status(200).send({ message: "user created", data: user });
    } catch (err) {
      return res.send(err.details);
    }
  } catch (err) {
    return res.status(500).send({ message: "server error", error: err });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (!user)
      res.status(404).send({ message: "user not existed with this email" });

    const check = await bcrypt.compare(req.body.password, user.password);
    if (!check) res.status(200).send({ message: "user logedIn", data: user });
  } catch (err) {
    res.status(500).send({ message: "server error", error: err });
  }
};
module.exports = { registerUser };
