const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const { JWT_SECRET } = require("../keys");

router.get("/", (req, res) => {
  res.json({ message: "Auth API is running" });
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(422).json({ error: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ error: "User already exists with this email" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User signed up successfully" });
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(422).json({ error: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(422).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    const { _id, name, followers, following } = user;
    res.json({
      token,
      message: "Signed in successfully",
      user: { _id, name, email, followers, following },
    });
  } catch (err) {
    res.status(500).json({ error: "Sign in failed" });
  }
});

module.exports = router;
