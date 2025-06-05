const sharefiles = async (req, res) => {
  try {
    const file = req.file;
    const { targeteduserId } = req.body;

    if (!targeteduserId)
      return res.status(400).json({ message: "targeted userId required" });

    if (!file.startsWith.includes(targeteduserId)) {
      file.startsWith.push(targeteduserId);
      await file.save();
    }

    return res.status(200).json({ message: "File shared successfully", file });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export default sharefiles;
