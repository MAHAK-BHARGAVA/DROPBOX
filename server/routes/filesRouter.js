import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import {
  uploadFile,
  createFolder,
  getMyFiles,
  getTrashFiles,
  moveToTrash,
  restoreFromTrash,
  permanentlyDelete,
   searchFiles,
   moveFile,
   renameFile,
   downloadFile,
   toggleShare,
  //  getPublicFile,
   shareWithUser,
    getFileAccess,
    // removeUserAccess, 
  //  previewFile
} from "../controllers/fileController.js";

const filesRouter = express.Router();

/* =========================
   UPLOAD FILE
========================= */
filesRouter.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadFile
);

/* =========================
   ACTIVE FILES (NOT TRASHED)
========================= */
filesRouter.get(
  "/my-files",
  authMiddleware,
  getMyFiles
);

/* =========================
   TRASH
========================= */
filesRouter.get(
  "/trash",
  authMiddleware,
  getTrashFiles
);

filesRouter.put(
  "/trash/:fileId",
  authMiddleware,
  moveToTrash
);

filesRouter.put(
  "/restore/:fileId",
  authMiddleware,
  restoreFromTrash
);

filesRouter.delete(
  "/permanent/:fileId", 
  authMiddleware, 
  permanentlyDelete
);


/* =========================
   CREATE FOLDER
========================= */
filesRouter.post(
  "/create-folder",
  authMiddleware,
  createFolder
);

/* 🔍 SEARCH */
filesRouter.get(
  "/search",
  authMiddleware,
  searchFiles
);

filesRouter.post("/move", 
authMiddleware, 
moveFile);
 
/* =========================
   RENAME FILE / FOLDER
========================= */
filesRouter.put(
  "/rename/:fileId",
  authMiddleware,
  renameFile
);

// download file
filesRouter.get(
  "/download/:fileId",
  authMiddleware,
  downloadFile
);

filesRouter.put(
  "/share/:fileId",
  authMiddleware,
  toggleShare
);

// filesRouter.get(
//   "/public/:shareToken",
//   getPublicFile
// );

filesRouter.post(
  "/share/:fileId/user",
  authMiddleware,
  shareWithUser
);

filesRouter.get(
  "/share/:fileId/access",
  authMiddleware,
  getFileAccess
);

// filesRouter.delete(
//   "/share/:fileId/user/:userId",
//   authMiddleware,
//   removeUserAccess
// );

// preview file
// filesRouter.get(
//   "/preview/:fileId",
//   authMiddleware,
//   previewFile
// );

export default filesRouter;