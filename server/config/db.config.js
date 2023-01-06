const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
module.exports = () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.DB_URL);
    console.log(`mongodb is connected`);
  } catch (err) {
    console.log(`error:${err.message}`);
  }
};
