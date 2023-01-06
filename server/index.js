const express = require("express");
const database = require("./config/db.config");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./routes/user.routes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

database();

app.use("/api/user", userRouter);

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`running on port:${port}`);
});
