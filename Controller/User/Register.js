const User = require("../../Models/User");
const { generateToken } = require("../../Utility/JWT");
const { hashPassword } = require("../../Utility/Password");

const handleRegister = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    //  Validate input server-side too (defensive)
    if (!name || !email || !password || !username) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    //  Check if user already exists by email OR username
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email or username already in use" });
    }

   

    //  Hash password
    const hashedPassword = await hashPassword(password);

    // Save new user
    const newUser = new User({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      username: username.trim(),
    });

    await newUser.save();

    //  Generate JWT
    const token = generateToken(newUser._id);

    // Send JWT as HTTP-only cookie (safer)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 60 * 60 * 24 * 1000, 
    });

    //  Final response — NEVER send password!
    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        avtar:newUser.avtar
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = handleRegister;
