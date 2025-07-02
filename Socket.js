// Socket/Socket.js
let ioInstance;
const connectedUsers = new Map();

function initSocket(server) {
  const io = require("socket.io")(server, {
    cors: {
      origin: false,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`🔗 Socket connected: ${socket.id}`);

    socket.on("register", (userId) => {
      connectedUsers.set(userId, socket.id);
      console.log(`✅ User ${userId} registered with socket ${socket.id}`);
    });

    socket.on("disconnect", () => {
      for (const [userId, sockId] of connectedUsers.entries()) {
        if (sockId === socket.id) {
          connectedUsers.delete(userId);
          console.log(`❌ User ${userId} disconnected`);
          break;
        }
      }
    });
  });

  io.connectedUsers = connectedUsers;
  ioInstance = io;

  console.log("✅ Socket.IO initialized");
}

function emitToUser(userId, eventName, payload) {
  if (!ioInstance) {
    throw new Error("Socket.IO not initialized!");
  }
  const socketId = ioInstance.connectedUsers.get(userId);
  if (socketId) {
    ioInstance.to(socketId).emit(eventName, payload);
  } else {
    console.log(`ℹ️ User ${userId} not connected — skipping emit.`);
  }
}

module.exports = { initSocket, emitToUser };
