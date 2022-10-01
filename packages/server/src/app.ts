import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/v1";

dotenv.config();

const app = express();

// middleware
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());

// v1 api routes
app.use("/v1", routes);

export default app;
