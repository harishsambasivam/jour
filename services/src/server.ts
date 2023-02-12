import { initApp } from "./app";
import { getEnv } from "./config/env";
import { logger } from "./utils/logger";
import mongoose from "mongoose";

(async function init() {
  try {
    await mongoose.connect(getEnv("mongouri"));
    logger.info("connected to mongodb");
  } catch (err) {
    logger.error(err);
  }
  const app = await initApp(mongoose);
  app.listen(getEnv("port"), () => {
    logger.info(`server started on port ${getEnv("port")}`);
  });
})();
