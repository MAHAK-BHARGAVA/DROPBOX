import File from "../models/File.js";
import fs from "fs";

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

/* =========================
   RECURSIVE DESCENDANTS
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

/* =========================
   TRASH CLEANUP JOB
========================= */
export const cleanupTrash = async () => {
  try {
    const expiredRoots = await File.find({
      isTrashed: true,
      trashedAt: { $lt: new Date(Date.now() - THIRTY_DAYS) }
    }).populate("user");

    for (const root of expiredRoots) {
      const user = root.user;
      let allItems = [root];

      // 📁 If folder → collect everything inside
      if (root.type === "folder") {
        const descendants = await getAllDescendants(
          root._id,
          user._id
        );
        allItems = allItems.concat(descendants);
      }

      /* =========================
         DELETE FILES FROM DISK
      ========================= */
      let freedSize = 0;

      for (const item of allItems) {
        if (
          item.type === "file" &&
          item.path &&
          fs.existsSync(item.path)
        ) {
          fs.unlinkSync(item.path);
          freedSize += item.size || 0;
        }
      }

      /* =========================
         DELETE DB RECORDS
      ========================= */
      await File.deleteMany({
        _id: { $in: allItems.map(i => i._id) }
      });

      /* =========================
         UPDATE USER STORAGE
      ========================= */
      if (user && freedSize > 0) {
        user.storageUsed = Math.max(
          0,
          user.storageUsed - freedSize
        );
        await user.save();
      }
    }

    console.log("🧹 Trash cleanup completed");
  } catch (err) {
    console.error("❌ Trash cleanup failed:", err.message);
  }
};

