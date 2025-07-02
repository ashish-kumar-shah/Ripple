const cloudinary = require('../../Config/Cloudinary');
const Post = require('../../Models/Post');
const User = require('../../Models/User');
const fs = require('fs');
const { deleteCache } = require('../../Utility/Cache');



// cloudinary.api.delete_all_resources({ resource_type: 'image' }, (error, result) => {
//   if (error) console.error(error);
//   else console.log(result);
// });

// cloudinary.api.delete_all_resources({ resource_type: 'video' }, (error, result) => {
//   if (error) console.error(error);
//   else console.log(result);
// });

const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const files = req.files;
    const userId = req.userId;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const content = [];

    for (const file of files) {
      const isVideo = file.mimetype.startsWith('video');
      let result;

      try {
        result = await cloudinary.uploader.upload(file.path, {
          resource_type: isVideo ? 'video' : 'image',
          folder: 'posts',
        });

        content.push({
          type: isVideo ? 'video' : 'image',
          value: result.public_id,
          url: result.secure_url,
        });
      } catch (err) {
        console.error('Cloudinary Upload Error:', err);
        throw new Error('Upload failed');
      } finally {
        try {
          fs.existsSync(file.path) && fs.unlinkSync(file.path);
        } catch (e) {
          console.warn('Failed to clean temp file:', e.message);
        }
      }
    }

    const post = await Post.create({ user: userId, caption, content });

    // Optional: track post count
    const update=  await User.findByIdAndUpdate(userId, { $inc: { postCount: 1 } });
  
    // Clear cache
    if(update){
    await deleteCache(`userProfile:${update.username}`);
    await deleteCache(`user:${userId}`);
    }


    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error('Create Post Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = createPost;
