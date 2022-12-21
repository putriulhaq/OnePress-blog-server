const express = require("express");
const router = express.Router();
const Posts = require("../models/Post");

router.get("/search", async (req, res) => {
  const query = req.query.q;
  try {
    const postsWithQuery = await Posts.find({
      title: { $regex: query, $options: "i" },
    });
    res.status(200).json(postsWithQuery);
  } catch (error) {
    console.log(error);
  }
});

router.post("/posts", async (req, res) => {
  const newPost = new Posts(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/posts/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Posts.find({ username });
    } else if (catName) {
      posts = await Posts.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Posts.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    let posts;
    posts = await Posts.findById(req.params.id);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/posts/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Posts.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
