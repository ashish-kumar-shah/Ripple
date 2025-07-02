const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const User = require('../../Models/User');
const {deleteCache} = require('../../Utility/Cache')

const uploadProfileAvatar = async (req,res) => {
  try {

    const file = req.file;
    const userId  = req.userId;


    if (!file) {
      return res.json({
        success: false,
        message: "No file uploaded.",
      });
    }

    // Upload to Cloudinary under `avatars/` folder
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: 'image',
      folder: 'avatars',
    });

    // Remove temp file
    fs.existsSync(file.path) && fs.unlinkSync(file.path);

    // Update user's avatar field
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avtar: result.secure_url },
      { new: true }
    ).select('-password');

    await deleteCache(`userProfile:${updatedUser.username}`)

    return res.json({
      success: true,
      avatarUrl: result.secure_url,
      user: updatedUser,
    });
  } catch (error) {
   console.log(req.file)

    console.error('Avatar Upload Error:', error);
      return res.json({
        success: false,
        message: 'Avatar upload failed.',
      });
  }
};

module.exports = uploadProfileAvatar;
