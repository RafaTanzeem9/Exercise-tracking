const Task = require("../../models/task.model");

const getTask = async (req, res) => {
  try {
    const task = await Task.find({ userId: req.user._id });
    res.status(200).send({ task });
  } catch (err) {
    res.status(500).send({ message: "server error", error: err });
  }
};
const createTask = async (req, res) => {
  console.log(req.body, req.user._id);
  try {
    const task = await Task.create({
      type: req.body.type,
      duration: req.body.duration,
      comment: req.body.comment,
      userId: req.user._id,
    });
    res.status(200).send({ message: "createTasks", task });
  } catch (err) {
    res.status(500).send({ message: "server error", error: err });
  }
};

module.exports = { getTask, createTask };
