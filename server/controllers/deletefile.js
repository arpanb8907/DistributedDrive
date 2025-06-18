import fs from "fs";
import path from "path";
import File from "../models/filemodel.js";

const deletefile = async (req, res) => {
  try {
    const file = req.file;

    const filepath = path.resolve(file.path);

    await fs.unlink(filepath, async (err) => {
      if (err) {
        console.error("File deletion error:", err);
        return res
          .status(500)
          .json({ message: "Failed to delete file from server" });
      }

      // Remove file document from DB
      await File.findByIdAndDelete(req.params.id);

      return res.status(200).json({ message: "File deleted successfully" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export default deletefile;
