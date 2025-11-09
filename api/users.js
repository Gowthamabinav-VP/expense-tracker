import mongoose from "mongoose";
import User from "../models/User.js";  // if you use a model
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
  }

  if (req.method === "GET") {
    const users = await User.find();
    res.status(200).json(users);
  } else if (req.method === "POST") {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
