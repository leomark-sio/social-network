const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");

router.post("/createpost", requireLogin, async (req, res) => {
  try {
    const { title, body, photo } = req.body;
    if (!title || !body) {
      return res.status(422).json({ error: "Title and body are required" });
    }
    req.user.password = undefined;
    const post = new Post({
      title,
      body,
      photo: photo || "",
      postedBy: req.user._id,
    });
    const result = await post.save();
    res.status(201).json({ post: result });
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

router.get("/posts", requireLogin, async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: { $in: req.user.following } })
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name")
      .sort("-createdAt");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.get("/allposts", requireLogin, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name")
      .sort("-createdAt");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.get("/myposts", requireLogin, async (req, res) => {
  try {
    const mypost = await Post.find({ postedBy: req.user._id })
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name")
      .sort("-createdAt");
    res.json({ mypost });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.put("/like", requireLogin, async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      return res.status(422).json({ error: "Post ID is required" });
    }
    const result = await Post.findByIdAndUpdate(
      postId,
      { $push: { likes: req.user._id } },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to like post" });
  }
});

router.put("/unlike", requireLogin, async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      return res.status(422).json({ error: "Post ID is required" });
    }
    const result = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to unlike post" });
  }
});

router.put("/comment", requireLogin, async (req, res) => {
  try {
    const { postId, text } = req.body;
    if (!postId || !text) {
      return res.status(422).json({ error: "Post ID and comment text are required" });
    }
    const comment = { text, postedBy: req.user._id };
    const result = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment } },
      { new: true }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name");
    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
});

router.delete("/delete/:postId", requireLogin, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId }).populate(
      "postedBy",
      "_id"
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.postedBy._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized to delete this post" });
    }
    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

module.exports = router;
