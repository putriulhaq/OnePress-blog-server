const express = require("express");
const Users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const bcrypt = require("bcryptjs");

const JWTSECRETKEY = 'onepress';

const User = require("../models/user");
Users.use(cors());

const re_pass = /^[a-zA-Z0-9]{4,30}$/;
const userSchema = joi.object({
  name: joi.string(),
  email: joi.string().email().required(),
  username: joi.string(),
  password: joi.string().pattern(re_pass).required(),
});

Users.post("/register", (req, res) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.json({ message: `${user.email} registered succesfully` });
            })
            .catch((err) => {
              res.send(err);
            });
        });
      } else {
        res.status(400).json({ message: `User already exist` });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

Users.post("/login", (req, res) => {
    User.findOne({"username":req.body.username
    })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ userId: user.userId }, JWTSECRETKEY, {
            expiresIn: '1 days',
          });
          res.json({
            message: `${user.email} login succesfully`,
            name: user.name,
            username:user.username,
            email: user.email,
            token,
          });
        } else {
          res.status(400).json({ message: "invalid credentials" });
        }
      } else {
        res.status(400).json({ message: "user doesnt exist" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

module.exports = Users;

