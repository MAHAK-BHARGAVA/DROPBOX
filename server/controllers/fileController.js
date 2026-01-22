import File from "../models/File.js";
import fs from "fs";

export const uploadFile = async (req, res) => {
  try {
    const user = req.user;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    /* ============================
       STORAGE LIMIT CHECK
    ============================ */
    const limit = user.getStorageLimit();

    if (user.storageUsed + file.size > limit) {
      // ❗ Remove uploaded file from disk (VERY IMPORTANT)
      fs.unlinkSync(file.path);

      return res.status(400).json({
        message: "Storage limit exceeded. Upgrade your plan."
      });
    }

    /* ============================
       SAVE FILE METADATA
    ============================ */
    const newFile = await File.create({
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
      user: user._id,
      uploadedAt: new Date()
    });

    /* ============================
       UPDATE USER STORAGE
    ============================ */
    user.storageUsed += file.size;
    await user.save();

    res.status(201).json(newFile);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyFiles = async (req, res) => {
  try {
    const files = await File.find({
      user: req.user._id,
      isTrashed: false   
    }).sort({ uploadedAt: -1 });

    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFolder = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Folder name required" });
    }

    const folder = await File.create({
      filename: name,
      originalName: name,
      type: "folder",          // 👈 important
      user: req.user._id,
      uploadedAt: new Date()
    });

    res.json(folder);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const moveToTrash = async (req, res) => {
  try {
    const { fileId } = req.params;

    const file = await File.findOne({
      _id: fileId,
      user: req.user._id
    });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    file.isTrashed = true;
    await file.save();

    res.json({ message: "Moved to trash" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const restoreFromTrash = async (req, res) => {
  try {
    const { fileId } = req.params;

    const file = await File.findOne({
      _id: fileId,
      user: req.user._id,
      isTrashed: true
    });

    if (!file) {
      return res.status(404).json({ message: "File not found in trash" });
    }

    file.isTrashed = false;
    await file.save();

    res.json({ message: "File restored" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const permanentlyDelete = async (req, res) => {
  try {
    const { fileId } = req.params;
    const user = req.user;

    const file = await File.findOne({
      _id: fileId,
      user: user._id,
      isTrashed: true
    });

    if (!file) {
      return res.status(404).json({ message: "File not found in trash" });
    }

    // Remove file from disk
    if (file.type === "file") {
      fs.unlinkSync(file.path);
    }

    // Update storage
    user.storageUsed -= file.size;
    await user.save();

    await file.deleteOne();

    res.json({ message: "File permanently deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrashFiles = async (req, res) => {
  try {
    const files = await File.find({
      user: req.user._id,
      isTrashed: true
    }).sort({ uploadedAt: -1 });

    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchFiles = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.json([]);
    }

    const files = await File.find({
      user: req.user._id,
      isTrashed: false,
      originalName: { $regex: q, $options: "i" }
    })
      .limit(20)
      .sort({ updatedAt: -1 });

    res.json(files);
  } catch (error) {
    res.status(500).json({
      message: "Search failed",
      error: error.message
    });
  }
};



