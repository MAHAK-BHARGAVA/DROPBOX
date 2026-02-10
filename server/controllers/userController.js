import User from "../models/User.js";
import File from "../models/File.js";

/* =======================
   GET PROFILE
======================= */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User
      .findById(userId)
      .select("-password");

    if (!user)
      return res.status(404).json({
        message: "User not found"
      });

    const files = await File.find({ user: userId });

    const storageUsedBytes =
      files.reduce((acc, file) => acc + file.size, 0);

    const storageUsedGB =
      (storageUsedBytes / (1024 ** 3)).toFixed(2);

    let storageTotal;

    switch (user.accountType) {
      case "Pro":
        storageTotal = 100;
        break;

      case "Admin":
        storageTotal = 500;
        break;

      default:
        storageTotal = 15;
    }

    res.json({
      name: user.name,
      email: user.email,
      accountType: user.accountType,
      storageUsed: storageUsedGB,
      storageTotal,
      profilePhoto:
        user.profilePhoto || "/default-avatar.png",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error"
    });
  }
};


/* =======================
   UPDATE NAME
======================= */
export const updateName = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Name is required"
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Name updated successfully",
      user
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error"
    });
  }
};

/* =======================
   UPDATE PASSWORD
======================= */
export const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: "Old and new passwords are required"
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        message: "Old password is incorrect"
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error"
    });
  }
};

/* UPDATE PROFILE PHOTO */
export const updatePhoto = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePhoto: imagePath },
      { new: true }
    ).select("-password");
    console.log("FILE:", req.file);

    res.json({
      success: true,
      message: "Profile photo updated",
      profilePhoto: imagePath,
      user
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
