import File from "../models/File.js";

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    const newFile = await File.create({
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
      user: req.user._id,
      uploadedAt: new Date() // force set
    });

    res.json(newFile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyFiles = async (req, res) => {
  const files = await File.find({
    user: req.user._id
  }).sort({ uploadedAt: -1 });

  res.json(files);
};

