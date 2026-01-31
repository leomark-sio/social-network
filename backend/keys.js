require("dotenv").config();

module.exports = {
  MONGOURI: process.env.MONGOURI || "mongodb://localhost:27017/socialnetwork",
  JWT_SECRET: process.env.JWT_SECRET || "your-jwt-secret-change-in-production",
};
