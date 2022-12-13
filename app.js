const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const connect = require("./database/db");

//database connection
connect();

//middelwares
app.use(express.json());
app.use(cors());

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(port, "Server is open with port!");
});
