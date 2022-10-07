import mongoose from "mongoose";
import { MONGO_URI } from "../config";

export function connect(cb: mongoose.CallbackWithoutResult) {
  if (!MONGO_URI) throw new Error("NOT URI");

  if (mongoose.connection.db) {
    return mongoose.connection;
  }

  mongoose.connect(MONGO_URI, cb);

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
}

export function disconnect() {
  return mongoose.disconnect();
}
