import File from "../models/filemodel.js";
import mongoose from "mongoose";

const getfiles = async (req, res) => {
  try {
    let files = [];

    const type = req.query.type;
    const userId = req.user.id;
    let flag = 0;

    const objectUserId = new mongoose.Types.ObjectId(userId);
    
    if (type === "uploaded") {
      files = await File.find({ user: objectUserId });
      flag = 1;
    } else if (type === "shared") {
      files = await File.find({ sharedWith: objectUserId });

      flag = 1;
    } else if (type === "starred") {
      files = await File.find({
        isStarred: true,

        $or: [{ user: objectUserId }, { sharedWith: objectUserId }],
      });
      flag = 1;
    }

    if (flag) {
      return res.status(200).json({ files });
    } else {
      return res.status(400).json({ message: "Invalid type query" });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default getfiles;
