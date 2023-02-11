import dotenv from "dotenv";
dotenv.config();

import { initApp } from "./app";
import { logger } from "./utils/logger";
import mongoose from "mongoose";

const { PORT: port, MONGO_URI: mongouri } = process.env;

(async function init() {
  try {
    await mongoose.connect(mongouri as string);
    logger.info("connected to mongodb");
  } catch (err) {
    logger.error(err);
  }
  const app = await initApp(mongoose);
  app.listen(port, () => {
    logger.info(`server started on port ${port}`);
  });
})();
