const User = require("../../Models/User");
const { generateToken } = require("../../Utility/JWT");
const { verifyPassword } = require("../../Utility/Password");

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Find user by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ success: false, message: "User does not exist" });
    }

    // Verify password
    const isMatch = await verifyPassword(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT
    const token = generateToken(existingUser._id);

    // Send JWT as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 60 * 60 * 24 * 1000, // 7 days
    });

    // Success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        username: existingUser.username,
        avtar:existingUser.avtar
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = handleLogin;
