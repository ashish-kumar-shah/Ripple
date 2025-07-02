const User = require("../../Models/User");
const { getCache, setCache } = require("../../Utility/Cache");

const authenticateUser = async (req, res) => {
  try {
    // 1️⃣ Try to get user from Redis
    let user = await getCache(`user:${req.userId}`);

    if (!user) {
      // 2️⃣ Not in cache → query MongoDB
      user = await User.findById(req.userId).select("-password");
      
      if (!user) {
        return res.status(401).json({ success: false, message: "User not found" });
      }

      // 3️⃣ Store fresh user in Redis for 5 mins
      await setCache(`user:${req.userId}`, user, 300);
    }

    res.status(200).json({
      success: true,
      user, 
    });

  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = authenticateUser;
