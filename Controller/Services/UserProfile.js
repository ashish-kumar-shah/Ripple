const User = require("../../Models/User");
const Post = require("../../Models/Post");
const { getCache, setCache } = require("../../Utility/Cache");

const handleUserProfile = async (req, res) => {
  try {
    const { username } = req.params;



   
    let profile = await getCache(`userProfile:${username}`)
   

    if (!profile) {
      const user = await User.findOne({ username }).select("_id name email username avtar postCount followerCount followingCount bio");

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      const posts = await Post.find({ user: user._id });

      profile = {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        avatar: user.avtar,
        posts,
        postCount: user.postCount,
        followerCount: user.followerCount,
        followingCount: user.followingCount,
        bio: user.bio,
      };

      await setCache(`userProfile:${username}`, profile, 300);
    }

    res.status(200).json({
      success: true,
      user: profile,
    });

  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = handleUserProfile;
