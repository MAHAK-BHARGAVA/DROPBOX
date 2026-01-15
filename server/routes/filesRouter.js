import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import { uploadFile } from "../controllers/fileController.js";
import File from "../models/File.js"; // ✅ ADD THIS

const filesRouter = express.Router();

filesRouter.post("/upload", authMiddleware, upload.single("file"), uploadFile);

filesRouter.get("/my-files", authMiddleware, async (req, res) => {
  const files = await File.find({ user: req.user._id });
  res.json(files);
});

export default filesRouter;
