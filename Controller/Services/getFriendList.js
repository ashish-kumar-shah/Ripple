const Friend = require('../../Models/Friends');

const getFriendLists = async (req, res) => {
  try {
    const userId = req.userId;

    // Get IDs of users who follow `userId`
    const followers = await Friend.find({ following: userId }).select('follower -_id');

    // Get IDs of users whom `userId` follows
    const following = await Friend.find({ follower: userId }).select('following -_id');

    return res.json({
      success: true,
      followers: followers.map(f => f.follower),
      following: following.map(f => f.following),
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = getFriendLists;
