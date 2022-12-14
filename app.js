const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const connection = require("./index");
const {about, posts} = require("./router")

//database connection
connection();

//middelwares
app.use(express.json());
app.use(cors());

const port = 3001;

app.use("/", [about]);
app.use("/", [posts]);
app.listen(port, () => {
  console.log(port, "Server is open with port!");
});
