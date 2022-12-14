const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
// require("dotenv").config();
const app = express();
const port = 3000;
const connection = require("./models/index");
const {about} = require("./router")
const User = require('./router/users')

//database connection
connection();

//middelwares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));

app.use("/api", [about]);

app.use('/user', User)
app.listen(port, () => {
  console.log(port, "Server is open with port!");
});
