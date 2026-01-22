import express from "express";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { 
  getProfile,
  updateName,
  updatePassword,
  updatePhoto
} from "../controllers/userController.js";

const userRoutes = express.Router();

/* GET PROFILE */
userRoutes.get("/profile", authMiddleware, getProfile);

/* UPDATE NAME */
userRoutes.put("/update-name", authMiddleware, updateName);

/* UPDATE PASSWORD*/
userRoutes.put("/update-password", authMiddleware, updatePassword);
//UPLOAD PHOTO
userRoutes.put(
  "/update-photo",
  authMiddleware,
  upload.single("photo"),
  updatePhoto
);

export default userRoutes;
