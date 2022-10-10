import express from "express";
import cors from "cors";
import routes from "./routes/v1";
import morgan from "morgan";
import errorMiddleware from "./middleware/error.middleware";
import { NODE_ENV } from "./config";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);

if (NODE_ENV !== "test") {
  app.use(morgan("tiny"));
  app.use(cors());
}

// v1 api routes
app.use("/v1", routes);

export default app;
