import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// Set up default mongoose connection
const uri = process.env.MONGO_URI;

export function connect(cb: mongoose.CallbackWithoutResult) {
  if (!uri) throw new Error("NOT URI");

  if (mongoose.connection.db) {
    return mongoose.connection;
  }

  mongoose.connect(uri, cb);

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
}

export function disconnect() {
  return mongoose.disconnect();
}
