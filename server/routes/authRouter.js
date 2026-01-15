import express from "express";
import { body } from "express-validator";
import { loginUser, registerUser } from "../controllers/authController.js";

const authRouter = express.Router();

/* =========================
   REGISTER ROUTE
   ========================= */
authRouter.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required"),

    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address"),

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain at least one special character"),
  ],
  registerUser
);

authRouter.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address"),

    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  loginUser
);

export default authRouter;
