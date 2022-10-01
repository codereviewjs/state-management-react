import app from "./app";
import { connect } from "./config/mongo";

let server: any;
const port = 8000;

connect((err) => {
  if (err) {
    console.error(err.message);
    return;
  }

  console.log("Connected to MongoDB");
  server = app.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: any) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
