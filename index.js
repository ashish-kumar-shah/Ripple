const express = require("express");
const http = require("http"); // ✅ Needed for Socket.IO
const chalk = require("chalk");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const connectToDb = require("./Config/Db");
const { notFoundHandler, globalErrorHandler } = require("./Utility/UnmatchedRoute");
const { initSocket } = require("./Socket"); // ✅ Import your custom socket setup
require("dotenv").config();
const fs = require("fs")
const path = require("path")

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());

// CORS setup
app.use(
  cors({
    origin: false,
    credentials: true,
  })
);

const clientBuildPath = path.resolve(__dirname, "./client/build");
console.log(clientBuildPath);

console.log(clientBuildPath);

if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
    
  app.get(/^\/(?!api).*/, (req, res) => {
    const indexHtml = path.join(clientBuildPath, "index.html");
    console.log(indexHtml);  
    
    if (fs.existsSync(indexHtml)) {
      res.sendFile(indexHtml); 
    } else {
      res.status(500).send("index.html not found.");
    }
  });
}


// Logs setup
app.use(morgan("dev"));

// Example API routes
app.use("/api/user/auth", require('./Routes/User.routes'));
app.use("/api/user/services", require('./Routes/Service.routes'));
app.use("/api/user/post", require('./Routes/Post.routes'));

// Catch-all for unmatched routes
app.all(/(.*)/, notFoundHandler());

// Global error handler
app.use(globalErrorHandler());

// Database connection
connectToDb();

// ✅ Create HTTP server & attach Socket.IO
const server = http.createServer(app);
initSocket(server); // <-- Initialize your Socket.IO with your helper

// Server Connection
server.listen(port, () => {
  console.log(chalk.bgGreen(`Server running: http://localhost:${port}`));
});
