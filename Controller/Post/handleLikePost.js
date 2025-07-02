const Like = require("../../Models/Likes");
const { emitToUser } = require("../../Socket");
const Post = require("../../Models/Post");
const User = require("../../Models/User");
const Notification = require("../../Models/Notification"); // ✅ Add this

const handleLikePost = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.body.postId;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const existingLike = await Like.findOne({ user: userId, post: postId });

    if (existingLike) {
      await existingLike.deleteOne();
      await Post.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });
      console.log("like-");

      return res.status(200).json({ liked: false, message: "Post unliked" });
    }

    const newLike = await Like.create({ user: userId, post: postId });
    await Post.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });
    console.log("like+");

    const post = await Post.findById(postId).select("user");
    const user = await User.findById(userId);

    if (post && String(post.user) !== String(userId)) {
      const notifPayload = { 
        from: userId,
        to: post.user,
        message: `${user.name} liked your post.`,
        type: "like",
        post: postId,
      };

      // ✅ Save in DB for offline fallback
      await Notification.create(notifPayload);

      // ✅ Emit real-time if user is online
      emitToUser(post.user.toString(), "notification", notifPayload);
    }

    return res
      .status(201)
      .json({ liked: true, message: "Post liked", like: newLike });
  } catch (error) {
    console.error("Error in handleLikePost:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = handleLikePost;
