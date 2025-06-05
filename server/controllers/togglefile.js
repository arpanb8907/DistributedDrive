const togglefile = async (req, res) => {
  try {
    const file = req.file;

    file.isStarred = !file.isStarred;
    await file.save();

    res.status(200).json({
      message: `File ${file.isStarred ? "starred" : "unstarred"} successfully`,
      file,
    });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

export default togglefile;
