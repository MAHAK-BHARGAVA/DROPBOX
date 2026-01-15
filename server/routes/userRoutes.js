import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getProfile } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/profile", authMiddleware, getProfile);

export default userRoutes;