// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRouter from "./routes/authRouter.js";
// import userRoutes from "./routes/userRoutes.js";
// import filesRouter from "./routes/filesRouter.js";
// import storageRouter from "./routes/storageRouter.js";
// import cron from "node-cron";
// import { cleanupTrash } from "./cron/trashCleanup.js";

// dotenv.config();

// const app = express();

// // ✅ Enable JSON parsing
// app.use(express.json());

// // ✅ Enable CORS for your frontend
// app.use(
//   cors({
//     origin: "http://localhost:5173", // React dev server URL
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
// // ✅ Routes
// app.use("/api/auth", authRouter);
// app.use("/api/user", userRoutes);
// app.use("/api/files", filesRouter);
// app.use("/api/storage", storageRouter);
// app.use("/uploads", express.static("uploads"));


// // ✅ MongoDB connection
// // ✅ MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB connected successfully");

//     // 🧹 Start trash cleanup cron AFTER DB is ready
//     cron.schedule("0 3 * * *", cleanupTrash);
//     console.log("🕒 Trash cleanup cron scheduled (3 AM daily)");
//   })
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // ✅ Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cron from "node-cron";

import authRouter from "./routes/authRouter.js";
import userRoutes from "./routes/userRoutes.js";
import filesRouter from "./routes/filesRouter.js";
import storageRouter from "./routes/storageRouter.js";
import { cleanupTrash } from "./cron/trashCleanup.js";

dotenv.config();

const app = express();
let cronStarted = false;

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());

app.use(

  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })

);

/* =========================
   ROUTES
========================= */
app.use("/api/auth", authRouter);
app.use("/api/user", userRoutes);
app.use("/api/files", filesRouter);
app.use("/api/storage", storageRouter);
app.use("/uploads", express.static("uploads"));

/* =========================
   DATABASE + CRON
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    if (!cronStarted) {
      cron.schedule(
        "0 3 * * *",
        cleanupTrash,
        { timezone: "Asia/Kolkata" }
      );
      cronStarted = true;
      console.log("🕒 Trash cleanup cron scheduled (3 AM IST)");
    }
  })
  .catch(err =>
    console.error("❌ MongoDB connection error:", err)
  );

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
