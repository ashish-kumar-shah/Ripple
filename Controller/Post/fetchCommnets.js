const Comment = require("../../Models/Comment");

const handleGetCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required."
      });
    }

    const comments = await Comment.find({ post: postId })
      .populate('user', 'username avtar _id')
      .sort({ createdAt: -1 }); // Optional: latest first

    res.json({ success: true, comments });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = handleGetCommentsByPostId;
