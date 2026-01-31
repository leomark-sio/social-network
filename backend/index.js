const express = require("express");
const mongoose = require("mongoose");

const { MONGOURI } = require("./keys");
const PORT = process.env.PORT || 3000;

require("./models/user");
require("./models/post");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

mongoose
  .connect(MONGOURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
