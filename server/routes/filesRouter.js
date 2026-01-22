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
   searchFiles
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
  "/delete/:fileId",
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

export default filesRouter;

