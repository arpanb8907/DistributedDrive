import File from "../models/filemodel.js";

const verifyOwner = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);
    console.log(req.params)
    if (!file) return res.status(404).json({ message: "File not found" });

    const isOwner = file.user.toString() === req.user.id;
    const filesharedwith = file.sharedWith.includes(req.user.id);
    //console.log(isOwner, filesharedwith);

    if (!isOwner && !filesharedwith) {
      return res.status(403).json({ message: "Access denied" });
    }

    req.file = file;
    next();
  } catch (error) {
    return res.status(404).json("server error");
  }
};

export default verifyOwner;
