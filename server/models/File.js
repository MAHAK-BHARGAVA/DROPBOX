import mongoose from "mongoose";
const fileSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  path: String,
  size: Number,
  mimetype: String,

  type: {
    type: String,
    enum: ["file", "folder"],
    default: "file",
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  parentFolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    default: null,
  },

  isTrashed: {
    type: Boolean,
    default: false,
  },

  trashedAt: {
    type: Date,
    default: null,
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },

  isPublic: { type: Boolean, default: false },
  shareToken: { type: String },

  sharedWith: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      role: {
        type: String,
        enum: ["viewer", "editor"],
        default: "viewer",
      },
    },
  ],

  inheritsFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    default: null,
  },
});

fileSchema.index({ isTrashed: 1, trashedAt: 1 });
export default mongoose.model("File", fileSchema);


