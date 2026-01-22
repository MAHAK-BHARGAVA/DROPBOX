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
    default: "file"
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  isTrashed: {
    type: Boolean,
    default: false
  },

  uploadedAt: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model("File", fileSchema);


