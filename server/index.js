const express = require("express");
const UAParser = require("ua-parser-js");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Cho phép CORS từ mọi nguồn

// Route xử lý request
app.post("/track", (req, res) => {
  // Lấy IP
  const clientIp =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || "Unknown IP";

  // Lấy User-Agent
  const userAgent = req.headers["user-agent"] || "Unknown device";

  // Phân tích User-Agent
  const parser = new UAParser(userAgent);
  const result = parser.getResult();
  const deviceInfo = `${result.browser.name || "Unknown"} ${
    result.browser.version || ""
  } on ${result.os.name || "Unknown"} ${result.os.version || ""}`;

  console.log(`Request received from IP: ${clientIp}, Device: ${deviceInfo}`);

  res.json({
    ip: clientIp,
    device: deviceInfo,
  });
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
