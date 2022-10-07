import express from "express";
import cors from "cors";
import routes from "./routes/v1";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware";

const app = express();

// middleware
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(errorMiddleware);

// v1 api routes
app.use("/v1", routes);

export default app;
