const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { JWT_SECRET } = require("../keys");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "User is not logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    try {
      const user = await User.findById(payload._id);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ error: "Authentication failed" });
    }
  });
};
