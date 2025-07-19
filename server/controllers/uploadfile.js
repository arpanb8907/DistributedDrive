import File from "../models/filemodel.js";
import s3 from "../config/s3Config.js";

const uploadfile = async (req, res) => {
  try {
    if (!req.file) return res.status(404).json({ message: "File not found" });

    // Here we need to store the file actually in database along with meta data of file in Database

    const file = req.file;
    const fileName = `${Date.now()}-${file.originalname}`;

    // upload file to s3

    const s3Result = await s3.upload({
      Bucket : 'my-ap-1',
      Key : `uploads/${fileName}`,
      Body:file.buffer,
      ContentType:file.mimetype,
      ACL: 'private' 
    }).promise();
    
    const newfile = await File.create({
      filename : fileName,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      user: req.user.id,
      sharedWith: [],
      path: s3Result.Location,
      sharedLink: '',
      isPublic: false,
    });

    await newfile.save();

    return res
      .status(200)
      .json({ newfile, message: "File uploaded successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default uploadfile;
