const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const posts = await Post.find({ postedBy: req.params.id })
      .populate("postedBy", "_id name")
      .sort("-createdAt");
    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

router.put("/follow", requireLogin, async (req, res) => {
  try {
    const { followId } = req.body;
    if (!followId) {
      return res.status(422).json({ error: "Follow ID is required" });
    }
    await User.findByIdAndUpdate(followId, {
      $push: { followers: req.user._id },
    });
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { following: followId } },
      { new: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to follow user" });
  }
});

router.put("/unfollow", requireLogin, async (req, res) => {
  try {
    const { unfollowId } = req.body;
    if (!unfollowId) {
      return res.status(422).json({ error: "Unfollow ID is required" });
    }
    await User.findByIdAndUpdate(unfollowId, {
      $pull: { followers: req.user._id },
    });
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { following: unfollowId } },
      { new: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to unfollow user" });
  }
});

module.exports = router;
