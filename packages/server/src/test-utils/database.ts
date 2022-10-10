import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import "../config";

let mongo: MongoMemoryServer | null = null;

export const connectDB = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri);
};

export const dropDB = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};

export const dropCollections = async () => {
  if (mongo) {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      if (collection.collectionName !== "auths") {
        await collection.deleteMany({});
      }
    }
  }
};
