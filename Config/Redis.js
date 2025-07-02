const { createClient } = require("redis");

const redisClient = createClient({
  socket: {
    reconnectStrategy: retries => {
      if (retries > 10) return new Error("Redis reconnect limit reached");
      return Math.min(retries * 50, 500);
    }
  }
});

redisClient.on("error", err => {
  console.error("❌ Redis error:", err);
});

(async () => {
  try {
    await redisClient.connect();
    console.log("✅ Redis connected");
  } catch (err) {
    console.error("❌ Redis connection failed:", err);
  }
})();

module.exports = redisClient;
