const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const connection = require("./models/index");
const {about} = require("./router")

//database connection
connection();

//middelwares
app.use(express.json());
app.use(cors());

const port = process.env.port || 3000;

app.use("/", [about]);
app.listen(port, () => {
  console.log(port, "Server is open with port!");
});
