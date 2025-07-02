const Post = require('../../Models/Post');

const getPostById = async (req, res) => {
  try {
    const postId = req.params.postId;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: 'Post ID is required.'
      });
    }

    const post = await Post.findById(postId)
      .populate('user', 'username avtar _id') // populate post owner
      // if your Post has likes array

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found.'
      });
    }

    res.status(200).json({
      success: true,
      post
    });
  } catch (error) {
    console.error('❌ getPostById:', error);
    res.status(500).json({
      success: false,
      message: 'Server error.'
    });
  }
};

module.exports = getPostById;
