import User from "../models/usermodel.js";

const sharefiles = async (req, res) => {
  try {
    const file = req.file;
    const { targetedusername } = req.body;
    //console.log(file);

    console.log({
      sharedWith: file.sharedWith,
      targetedusername,
    });

    if (!targetedusername)
      return res.status(400).json({ message: "targeted userId required" });

    const user = await User.findOne({email : targetedusername})

    if(!user) return res.status(404).json({message: 'User not found'});

    

    if (!file.sharedWith.includes(user._id)) {
      file.sharedWith.push(user._id);
      await file.save();
    }

    return res.status(200).json({ message: "File shared successfully", file });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export default sharefiles;
