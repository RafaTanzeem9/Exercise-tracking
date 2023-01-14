const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
