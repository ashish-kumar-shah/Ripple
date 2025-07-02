const Friend = require('../../Models/Friends');
const User = require('../../Models/User');
const {deleteCache}= require('../../Utility/Cache')
const {emitToUser}  = require('../../Socket')
const handleFriend = async (req, res) => {
  try {
    const follower = req.userId; // logged-in user ID
    const { following } = req.body; // user to follow  

    if (!following) {
      return res.status(400).json({ success: false, message: 'Following user ID required.' });
    }

    if (follower === following) {
      return res.status(400).json({ success: false, message: 'You cannot follow yourself.' });
    }

    // Check if following user exists
    const followingUser = await User.findById(following);
    if (!followingUser) {
      return res.status(404).json({ success: false, message: 'User to follow not found.' });
    }

    // Check if already following
    const existing = await Friend.findOne({ follower, following });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Already following.' });
    }

    // Create new friend document
    const newFriend = new Friend({ follower, following });
    await newFriend.save();

    // Increment counts atomically
   const fl = await User.findByIdAndUpdate(following, { $inc: { followerCount: 1 } });
    const fo = await User.findByIdAndUpdate(follower, { $inc: { followingCount: 1 } });

    // clear cache
    await deleteCache(`userProfile:${fl.username}`)
    await deleteCache(`userProfile:${fo.username}`)
    await deleteCache(`user:${req.userId}`)


    return res.json({ success: true, message: 'Followed successfully.' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = handleFriend;
