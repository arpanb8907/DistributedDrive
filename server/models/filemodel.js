import mongoose from "mongoose";

const filemodel = mongoose.Schema({
  filename: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },

  originalname: {
    type: String,
    trim: true,
  },

  mimetype: {
    type: String,
    trim: true,
  },

  size: {
    type: Number,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  sharedWith: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },

  isStarred: {
    type: Boolean,
    default: false,
  },

  path: {
    type: String,
  },

  sharedLink: {
    type: String,
    default: "",
  },

  isPublic: {
    type: Boolean,
    default: false,
  },
});

const File = mongoose.model("file", filemodel);

export default File;
