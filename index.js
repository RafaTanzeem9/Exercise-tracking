const express = require("express");
const database = require("./server/config/db.config");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

database();

const port = 3001;
app.listen(port, () => {
  console.log(`running on port:${port}`);
});
