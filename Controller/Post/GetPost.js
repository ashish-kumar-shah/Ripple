const Post = require("../../Models/Post");

const getPost = async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 }) // latest first
      .skip(skip)
      .limit(limit)
      .populate('user', 'username avtar name') // optional user data
      .exec();

    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      hasMore: skip + posts.length < totalPosts,
    });
  } catch (error) {
    console.error("Fetch posts failed:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getPost;
