const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "",
  },
  postedBy: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  likes: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      text: String,
      postedBy: {
        type: ObjectId,
        ref: "User",
      },
    },
  ],
}, { timestamps: true });

mongoose.model("Post", postSchema);
