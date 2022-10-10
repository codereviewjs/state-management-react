import dotenv from "dotenv";

dotenv.config();

export const { MONGO_URI, SECRET, PORT, NODE_ENV = "dev" } = process.env;
