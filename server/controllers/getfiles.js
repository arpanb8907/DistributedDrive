import File from "../models/filemodel.js";

const getfiles = async (req, res) => {
  try {
    let files;

    const type = req.query.type;
    const userId = req.user.id;
    const flag = 0;

    if (type === "uploaded") {
      files = await File.find({ user: userId });
      flag = 1;
    } else if (type === "shared") {
      files = await File.find({ sharedWith: userId });
      flag = 1;
    } else if (type === "starred") {
      files = await File.find({
        isStarred: true,

        $or: [{ user: userId }, { sharedWith: userId }],
      });
      flag = 1;
    }

    if (flag) {
      return res.status(200).json({ files });
    } else {
      return res.status(400).json({ message: "Invalid type query" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export default getfiles