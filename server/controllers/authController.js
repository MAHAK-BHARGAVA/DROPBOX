import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

export const registerUser = async (req, res) => {
  // 1️⃣ VALIDATION ERRORS
  const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({
    message: "Validation failed",
    errors: errors.array().map(err => err.msg)
  });
}
  try {
    const { name, email, password } = req.body;

    // 1 check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // 2️⃣ CHECK EXISTING USER
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email is already registered"
      });
    }

    // 3️⃣ HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ CREATE USER
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5️⃣ CREATE TOKEN
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      message: "Server error. Please try again later."
    });
  }
};


export const loginUser = async (req, res) => {
  // 1️⃣ VALIDATION ERRORS
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map(err => err.msg),
    });
  }

  try {
    const {name, email, password } = req.body;

    // 1 check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }


    // 2️⃣ CHECK EMAIL
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Email is not registered",
      });
    }

    // 3️⃣ CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    // 4️⃣ CREATE TOKEN
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
};
