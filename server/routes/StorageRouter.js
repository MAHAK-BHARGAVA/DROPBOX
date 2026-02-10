import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getStorageSummary } from "../controllers/storageController.js";

const StorageRouter = express.Router();

StorageRouter.get("/summary", authMiddleware, getStorageSummary);

export default StorageRouter;