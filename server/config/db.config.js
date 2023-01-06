const mongoose = require("mongoose");
module.exports = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/practice");
    console.log(`mongodb is connected`);
  } catch (err) {
    console.log(`error:${err.message}`);
  }
};
