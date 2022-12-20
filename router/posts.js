const express = require("express");
const router = express.Router();
const Posts = require("../models/Post");

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
      posts = await Post.find();
    }
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


router.delete("/posts/delete/:postId", (req, res) => {
  const { postId } = req.params;
  const getPost = Posts.find({ postId });
  if (getPost.length > 0) {
    Posts.deleteOne({ postId });
  }
  return res.status(200).send({
    message: "Your post has been deleted",
  });
});



module.exports = router;
