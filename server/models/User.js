// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },

//   email: {
//     type: String,
//     unique: true,
//     required: true
//   },

//   password: {
//     type: String,
//     required: true
//   },

//   accountType: {
//     type: String,
//     enum: ["Free", "Pro", "Admin"],
//     default: "Free"
//   },

//   profilePhoto: {
//     type: String,
//     default: ""
//   }
// });

// /* HASH PASSWORD BEFORE SAVE */
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// /* COMPARE PASSWORD */
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return bcrypt.compare(enteredPassword, this.password);
// };

// export default mongoose.model("User", userSchema);


import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    /* =======================
       BASIC USER INFO
    ======================= */
    name: {
      type: String,
      required: true,
    },

    email: {
       type: String,
       unique: true,
       required: true
    },

    password: {
      type: String,
      required: true
    },

    /* =======================
       ACCOUNT PLAN
    ======================= */
    accountType: {
      type: String,
      enum: ["Free", "Pro", "Pro+"],
      default: "Free"
    },

    /* =======================
       STORAGE (BYTES)
    ======================= */
    storageUsed: {
      type: Number,
      default: 0
    },

    /* =======================
       PROFILE
    ======================= */
    profilePhoto: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

/* =======================
   STORAGE LIMIT (NO UTILS)
======================= */
userSchema.methods.getStorageLimit = function () {
  if (this.accountType === "Pro") return 100 * 1024 * 1024 * 1024;   // 100 GB
  if (this.accountType === "Pro+") return 1000 * 1024 * 1024 * 1024; // 1 TB
  return 15 * 1024 * 1024 * 1024; // Free = 15 GB
};


/* =======================
   HASH PASSWORD BEFORE SAVE
======================= */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/* =======================
   COMPARE PASSWORD
======================= */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);



