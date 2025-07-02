const User = require("../../Models/User");
const bcrypt = require("bcrypt");
const { deleteCache } = require("../../Utility/Cache");
// Suppose you have a helper for uploading avatar image
// const uploadAvatar = require('../../Utils/uploadAvatar');

const handleUpdateField = async (req, res) => {
  try {
    const userId = req.userId; // From verified token
    const updates = {}; // This will hold dynamic fields

    const { name, username, email, password, bio } = req.body;

    if (name) updates.name = name;
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (bio) updates.bio = bio;

    if (password && password.length >= 6) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No fields to update." });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");
    await deleteCache(`userProfile:${updatedUser.username}`);
        await deleteCache(`user:${req.userId}`)
    
    return res.json({
      success: true,
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = handleUpdateField;
