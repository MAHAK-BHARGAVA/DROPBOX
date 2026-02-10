import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import userRoutes from "./routes/userRoutes.js";
import filesRouter from "./routes/filesRouter.js";

dotenv.config();

const app = express();

// ✅ Enable JSON parsing
app.use(express.json());

// ✅ Enable CORS for your frontend
app.use(
  cors()
);
// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRoutes);
app.use("/api/files", filesRouter);
app.use("/uploads", express.static("uploads"));


// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

