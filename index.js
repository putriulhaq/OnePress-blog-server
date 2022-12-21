const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const multer = require("multer");
require("dotenv").config();
const app = express();
const port = 3001;
const connection = require("./models/index");
const {about, posts} = require("./router")
const User = require("./router/users")
const category = require("./router/category")

//database connection
connection();

//multer for upload image file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    // cb(null, req.body.name);
    cb(null, "test.png");
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/user', User)

app.use("/", [about]);
app.use("/", [posts]);
app.use("/", [category]);
app.listen(port, () => {
  console.log(port, "Server is open with port!");
});

// module.exports = connection;
