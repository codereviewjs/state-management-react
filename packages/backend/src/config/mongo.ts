import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const name = process.env.MONGO_NAME;
const password = process.env.MONGO_PASSWORD;
// Set up default mongoose connection
const uri = `mongodb+srv://${name}:${password}@cluster0.3o8w2j2.mongodb.net/?retryWrites=true&w=majority`;

export function connect(cb: mongoose.CallbackWithoutResult) {
  console.log("HERE?", mongoose.connection.db);

  if (mongoose.connection.db) {
    return mongoose.connection;
  }
  console.log("CONNECT");

  mongoose.connect(uri, cb);

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
}
