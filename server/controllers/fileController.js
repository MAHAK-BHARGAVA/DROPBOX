import File from "../models/File.js";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import User from "../models/User.js";
import { getUserRole } from "../utils/permissions.js";

/* =========================
   RECURSIVE HELPERS
========================= */

const getAllDescendants = async (folderId, userId) => {
  const children = await File.find({
    parentFolder: folderId,
    user: userId
  });

  let all = [...children];

  for (const child of children) {
    if (child.type === "folder") {
      const sub = await getAllDescendants(child._id, userId);
      all = all.concat(sub);
    }
  }

  return all;
};

const deleteFilesFromDisk = (files) => {
  for (const file of files) {
    if (file.type === "file" && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  }
};

const hasFolderAccess = async (file, userId) => {
  // Owner always has access
  if (file.user.toString() === userId.toString()) return true;

  // Direct share
  if (
    file.sharedWith?.some(
      u => u.user.toString() === userId.toString()
    )
  ) {
    return true;
  }

  // Public link
  if (file.isPublic) return true;

  // ⬆️ Check parent folder recursively
  if (file.parentFolder) {
    const parent = await File.findById(file.parentFolder);
    if (!parent) return false;

    return hasFolderAccess(parent, userId);
  }

  return false;
};


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
  const { folderId } = req.query;

  const allFiles = await File.find({
    isTrashed: false,
    parentFolder: folderId || null
  }).sort({ uploadedAt: -1 });

   console.log("GET /my-files HIT");

  const visible = [];

  for (const file of allFiles) {
    const allowed = await hasFolderAccess(file, req.user._id);
    if (allowed) visible.push(file);
  }

  res.json(visible);
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
      type: "folder",
      user: req.user._id,
      isTrashed: false,
      uploadedAt: new Date(),
    });

    res.json(folder);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const moveToTrash = async (req, res) => {
  try {
    const { fileId } = req.params;
    const userId = req.user._id;

    const root = await File.findOne({
      _id: fileId,
      user: userId,
      isTrashed: false
    });

    if (!root) {
      return res.status(404).json({ message: "Not found" });
    }
    
    const role = getUserRole(root, userId);
    if (role !== "owner") {
      return res.status(403).json({ message: "Only owner can trash" });
    }

    const descendants = await getAllDescendants(root._id, userId);
    const ids = [root._id, ...descendants.map(f => f._id)];
    const now = new Date();

    await File.updateMany(
      { _id: { $in: ids } },
      { $set: { isTrashed: true, trashedAt: now } }
    );

    res.json({ message: "Moved to trash recursively" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const restoreFromTrash = async (req, res) => {
  try {
    const { fileId } = req.params;
    const userId = req.user._id;

    const root = await File.findOne({
      _id: fileId,
      user: userId,
      isTrashed: true
    });

    if (!root) {
      return res.status(404).json({ message: "Not found in trash" });
    }
    
    const role = getUserRole(root, userId);
    if (role !== "owner") {
      return res.status(403).json({ message: "Only owner can restore" });
    }

    const descendants = await getAllDescendants(root._id, userId);
    const ids = [root._id, ...descendants.map(f => f._id)];

    await File.updateMany(
      { _id: { $in: ids } },
      { $set: { isTrashed: false, trashedAt: null } }
    );

    res.json({ message: "Restored recursively" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const permanentlyDelete = async (req, res) => {
  try {
    const { fileId } = req.params;
    const user = req.user;

    console.log("AUTH USER:", req.user);
    console.log("FILE ID:", req.params.fileId);


    const root = await File.findOne({
      _id: fileId,
      user: user._id,
      isTrashed: true
    });

    if (!root) {
      return res.status(404).json({ message: "Not found" });
    }
    
    const role = getUserRole(root, user._id);
    if (role !== "owner") {
      return res
        .status(403)
        .json({ message: "Only owner can delete permanently" });
    }

    const descendants = await getAllDescendants(root._id, user._id);
    const all = [root, ...descendants];

    // 1️⃣ Delete from disk
    deleteFilesFromDisk(all);

    // 2️⃣ Calculate freed storage
    const freedSize = all.reduce(
      (sum, f) => sum + (f.size || 0),
      0
    );

    // 3️⃣ Delete DB records
    await File.deleteMany({
      _id: { $in: all.map(f => f._id) }
    });

    // 4️⃣ Update storage
    user.storageUsed -= freedSize;
    await user.save();

    res.json({ message: "Deleted permanently (recursive)" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTrashFiles = async (req, res) => {
  try {
    const files = await File.find({
      user: req.user._id,
      isTrashed: true
    }).sort({ trashedAt: -1 });


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

export const moveFile = async (req, res) => {
  try {
    const { fileId, targetFolderId } = req.body;
    const userId = req.user._id;

    const file = await File.findOne({
      _id: fileId,
      type: "file",
      isTrashed: false,
      $or: [
        { user: userId }, // owner
        { "sharedWith.user": userId } // shared user
      ]
    });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
     
    const allowed = await hasFolderAccess(file, req.user._id);
    if (!allowed) {
      return res.status(403).json({ message: "Access denied" });
    }

     const role = getUserRole(file, userId);
     if (!["owner", "editor"].includes(role)) {
       return res.status(403).json({ message: "Permission denied" });
     }

    const folder = await File.findOne({
      _id: targetFolderId,
      user: userId,
      type: "folder"
    });

    if (!folder) {
      return res.status(404).json({ message: "Target folder not found" });
    }

    // Move file
    file.parentFolder = folder._id;
    await file.save();

    res.json({ message: "File moved successfully" });

  } catch (err) {
    res.status(500).json({ message: "Move failed" });
  }
};

export const renameFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "New name is required" });
    }

    const file = await File.findOne({
      _id: fileId,
      user: req.user._id,
      isTrashed: false
    });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    
    // 🔐 Folder-aware access check
    const allowed = await hasFolderAccess(file, req.user._id);
    if (!allowed) {
      return res.status(403).json({ message: "Access denied" });
    } 

    const role = getUserRole(file, req.user._id);
    if (!["owner", "editor"].includes(role)) {
      return res.status(403).json({ message: "Permission denied" });
    }

    // ✅ Rename (metadata only)
    file.originalName = name.trim();
    await file.save();

    res.json(file);

  } catch (error) {
    res.status(500).json({
      message: "Rename failed",
      error: error.message
    });
  }
};


export const downloadFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    const file = await File.findOne({
      _id: fileId,
      isTrashed: false,
    });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const allowed = await hasFolderAccess(file, req.user._id);
    if (!allowed) {
      return res.status(403).json({ message: "Access denied" });
    }

    // 2️⃣ Prevent folder download
    if (file.type === "folder") {
      return res.status(400).json({ message: "Cannot download a folder" });
    }

    // 3️⃣ Resolve path
    const filePath = path.resolve(file.path);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File missing on server" });
    }

    // 4️⃣ Force download
    return res.download(filePath, file.originalName);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Download failed" });
  }
};

export const toggleShare = async (req, res) => {
  const file = await File.findOne({
    _id: req.params.fileId,
    user: req.user._id
  });

  if (!file) return res.status(404).json({ message: "File not found" });

  if (!file.isPublic) {
    file.isPublic = true;
    file.shareToken = crypto.randomBytes(16).toString("hex");
  } else {
    file.isPublic = false;
    file.shareToken = null;
  }

  await file.save();
  res.json(file);
};

export const getPublicFile = async (req, res) => {
  const file = await File.findOne({
    shareToken: req.params.shareToken,
    isPublic: true
  });

  if (!file) {
    return res.status(404).json({ message: "Invalid link" });
  }

  if (file.type === "folder") {
    return res.status(400).json({ message: "Folders cannot be shared" });
  }

  const absolutePath = path.resolve(file.path);
  res.sendFile(absolutePath);
};

export const shareWithUser = async (req, res) => {
  try {
    const { email, role = "viewer" } = req.body;
    const { fileId } = req.params;

    const file = await File.findOne({
      _id: fileId,
      user: req.user._id // ONLY owner can share
    });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const userToShare = await User.findOne({ email });
    if (!userToShare) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyShared = file.sharedWith.some(
      u => u.user.toString() === userToShare._id.toString()
    );

    if (alreadyShared) {
      return res.status(400).json({ message: "User already has access" });
    }

    file.sharedWith.push({
      user: userToShare._id,
      role
    });

    await file.save();

    res.json({ message: "Access granted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFileAccess = async (req, res) => {
  const file = await File.findOne({
    _id: req.params.fileId,
    user: req.user._id
  })
    .populate("sharedWith.user", "name email");

  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  res.json({
    owner: req.user,
    sharedWith: file.sharedWith,
    isPublic: file.isPublic
  });
};

export const removeUserAccess = async (req, res) => {
  const { fileId, userId } = req.params;

  const file = await File.findOne({
    _id: fileId,
    user: req.user._id
  });

  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  file.sharedWith = file.sharedWith.filter(
    u => u.user.toString() !== userId
  );

  await file.save();
  res.json({ message: "Access removed" });
};

// export const previewFile = async (req, res) => {
//   try {
//     const { fileId } = req.params;

//     // 🔐 Ownership check
//     const file = await File.findOne({
//       _id: fileId,
//       user: req.user._id
//     });

//     if (!file) {
//       return res.status(404).json({ message: "File not found" });
//     }

//     if (file.type === "folder") {
//       return res.status(400).json({ message: "Cannot preview a folder" });
//     }

//     const filePath = path.resolve(file.path);
//     if (!fs.existsSync(filePath)) {
//       return res.status(404).json({ message: "File missing on server" });
//     }

//     // ✅ IMPORTANT: inline preview
//     res.setHeader(
//       "Content-Disposition",
//       `inline; filename="${file.originalName}"`
//     );

//     res.setHeader("Content-Type", file.mimetype);

//     return res.sendFile(filePath);

//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Preview failed" });
//   }
// };



