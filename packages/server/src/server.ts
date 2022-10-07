import { PORT } from "./config";
import app from "./app";
import { connect } from "./database";
import { logger } from "./utils/logger";

const port = PORT || 8000;

connect((err) => {
  if (err) {
    console.error(err.message);
    return;
  }

  app.listen(port, () => {
    logger.info(`=================================`);
    logger.info(`🚀 App listening on the port ${port}`);
    logger.info(`=================================`);
  });
});
