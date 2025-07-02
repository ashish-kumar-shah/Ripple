const Comment = require("../../Models/Comment");
const Post = require("../../Models/Post");
const User = require("../../Models/User");
const { emitToUser } = require("../../Socket");
const { saveNotification } = require("../Services/Notifications");

const handleCreateComment = async (req, res) => {
  try {
    const userId = req.userId;
    const { post, comment } = req.body;

    if (!post || !comment) {
      return res.status(400).json({
        success: false,
        message: "Post ID and comment text are required.",
      });
    }

    // Save comment
    const newComment = new Comment({
      user: userId,
      post,
      comment,
    });

    const savedComment = await newComment.save();
    await Post.findByIdAndUpdate(post, {
      $inc: { commentCount: 1 },
    });

    // Populate user for response
    const populatedComment = await Comment.findById(savedComment._id).populate(
      "user",
      "username avtar _id"
    );

    // ✅ Get post owner
    const targetPost = await Post.findById(post).select("user");
    const commentingUser = await User.findById(userId).select("username");

    if (targetPost && String(targetPost.user) !== String(userId)) {
      // ✅ 1. Emit notification to post owner
      emitToUser(targetPost.user.toString(), "notification", {
        type: "comment",
        from: userId,
        to: targetPost.user.toString(),
        post: post,
        message: `${commentingUser.username} commented on your post.`,
      });

      // ✅ 2. Save notification in DB
      await saveNotification({
        from: userId,
        to: targetPost.user.toString(),
        type: "comment",
        message: `${commentingUser.username} commented on your post.`,
        post: post,
      });
    }

    res.json({ success: true, comment: populatedComment });
  } catch (error) {
    console.error("❌ handleCreateComment:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = handleCreateComment;
