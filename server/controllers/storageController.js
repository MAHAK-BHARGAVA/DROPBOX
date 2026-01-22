import File from "../models/File.js";

export const getStorageSummary = async (req, res) => {
  try {
    const user = req.user;

    const files = await File.find({
      user: user._id,
      type: "file",
      isTrashed: false
    });

    const trashed = await File.find({
      user: user._id,
      isTrashed: true
    });

    const used = files.reduce((sum, f) => sum + (f.size || 0), 0);
    const trashSize = trashed.reduce((sum, f) => sum + (f.size || 0), 0);

    const limit = user.getStorageLimit();

    const largestFiles = await File.find({
      user: user._id,
      type: "file",
      isTrashed: false
    })
      .sort({ size: -1 })
      .limit(5)
      .select("originalName size");

    res.json({
      usage: {
        used,
        limit,
        files: used,
        trash: trashSize,
        shared: 0, // reserved for future
        plan: user.accountType
      },
      largestFiles
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to load storage summary"
    });
  }
};

