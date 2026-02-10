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
   getPublicFile,
   shareWithUser,
    getFileAccess,
    removeUserAccess, 
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

filesRouter.get(
  "/public/:shareToken",
  getPublicFile
);

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

filesRouter.delete(
  "/share/:fileId/user/:userId",
  authMiddleware,
  removeUserAccess
);

// preview file
// filesRouter.get(
//   "/preview/:fileId",
//   authMiddleware,
//   previewFile
// );

export default filesRouter;

// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import upload from "../middleware/upload.js";
// import {
//   uploadFile,
//   createFolder,
//   getMyFiles,
//   getTrashFiles,
//   moveToTrash,
//   restoreFromTrash,
//   permanentlyDelete,
//   searchFiles,
//   moveFile,
//   renameFile,
//   downloadFile,
//   toggleShare,
//   getPublicFile,
//   shareWithUser,
//   getFileAccess,
//   removeUserAccess,
// } from "../controllers/fileController.js";

// const filesRouter = express.Router();

// /* =========================
//    UPLOAD
// ========================= */
// filesRouter.post(
//   "/upload",
//   authMiddleware,
//   upload.single("file"),
//   uploadFile
// );

// /* =========================
//    FILE LISTING
// ========================= */
// filesRouter.get(
//   "/",
//   authMiddleware,
//   getMyFiles
// );

// /* =========================
//    TRASH
// ========================= */
// filesRouter.get(
//   "/trash",
//   authMiddleware,
//   getTrashFiles
// );

// filesRouter.put(
//   "/trash/:fileId",
//   authMiddleware,
//   moveToTrash
// );

// filesRouter.put(
//   "/restore/:fileId",
//   authMiddleware,
//   restoreFromTrash
// );

// filesRouter.delete(
//   "/trash/:fileId",
//   authMiddleware,
//   permanentlyDelete
// );

// /* =========================
//    FOLDER
// ========================= */
// filesRouter.post(
//   "/folder",
//   authMiddleware,
//   createFolder
// );

// /* =========================
//    SEARCH & MOVE
// ========================= */
// filesRouter.get(
//   "/search",
//   authMiddleware,
//   searchFiles
// );

// filesRouter.post(
//   "/move",
//   authMiddleware,
//   moveFile
// );

// /* =========================
//    RENAME
// ========================= */
// filesRouter.put(
//   "/:fileId",
//   authMiddleware,
//   renameFile
// );

// /* =========================
//    DOWNLOAD
// ========================= */
// filesRouter.get(
//   "/:fileId/download",
//   authMiddleware,
//   downloadFile
// );

// /* =========================
//    SHARING (GOOGLE DRIVE STYLE)
// ========================= */

// // Toggle public link
// filesRouter.put(
//   "/:fileId/share",
//   authMiddleware,
//   toggleShare
// );

// // Public access (no auth)
// filesRouter.get(
//   "/public/:shareToken",
//   getPublicFile
// );

// // Share with user (viewer/editor)
// filesRouter.post(
//   "/:fileId/share",
//   authMiddleware,
//   shareWithUser
// );

// // Get access list (for modal)
// filesRouter.get(
//   "/:fileId/access",
//   authMiddleware,
//   getFileAccess
// );

// // Remove user access
// filesRouter.delete(
//   "/:fileId/share/:userId",
//   authMiddleware,
//   removeUserAccess
// );

// export default filesRouter;


