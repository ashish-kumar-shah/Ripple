const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // put your secret in .env
const JWT_EXPIRES_IN = "7d"; // or whatever duration you want

// Generate JWT
 const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Verify JWT
 const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id; 
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = { generateToken, verifyToken };