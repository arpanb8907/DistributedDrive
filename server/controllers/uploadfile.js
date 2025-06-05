import File from "../models/filemodel.js";

const uploadfile = async (req, res) => {
  try {
    if (!req.file) return res.status(404).json({ message: "File not found" });

    // Here we need to store the file actually in server along with meta data of file in Database

    const { filename, originalname, mimetype, size, path } = req.file;

    const newFile = await File.create({
      filename,
      originalname,
      mimetype,
      size,
      path,
      user: req.user.id,
      sharedWith: [],
    });

    await newFile.save();
    
    return res
      .status(200)
      .json({ newFile, message: "File uploaded successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default uploadfile;
