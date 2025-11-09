// api/index.js
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas (only once)
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGO_URI);
}

// Example route
app.get("/api", (req, res) => {
  res.json({ message: "Backend is working via Vercel!" });
});

export default app;
