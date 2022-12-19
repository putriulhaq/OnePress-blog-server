const express = require("express");
const categories = express.Router();
const Category = require("../models/Category");

categories.get("/categories/post", async (req, res) => {
  const dataCategory = await Category.find();
  const nameCategory = dataCategory.map((data) => {
    return {
      id: data.id,
      data: data.name,
    };
  });
});

categories.post("/category", (req, res) => {
  try {
    const createCat = Category.create({
      name: req.body.name,
    });
    return res.status(200).send({
      message: `${req.body.name} created successfully`,
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = categories;
