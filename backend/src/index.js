import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import healthRoutes from "./routes/health.route.js";
import { app, server } from "./lib/socket.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// ✅ Updated CORS: allow chatapp.local for ingress
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["http://localhost:8080", "http://localhost", "http://chatapp.local"]
        : "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/health", healthRoutes);

// ✅ Only serve frontend when running standalone (not in K8s)
if (process.env.SERVE_FRONTEND === "true") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
} else {
  console.log("Skipping frontend serving (Kubernetes mode).");
}

// ✅ Start server
server.listen(PORT, () => {
  console.log(`✅ Server is running on PORT: ${PORT}`);
  connectDB();
});
