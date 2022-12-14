const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
// require("dotenv").config();
const app = express();
const port = 3001;
const connection = require("./models/index");
const {about, posts} = require("./router")

//database connection
connection();

//middelwares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/user', User)

app.use("/", [about]);
app.use("/", [posts]);
app.listen(port, () => {
  console.log(port, "Server is open with port!");
});

module.exports = connect;