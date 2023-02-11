import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { app } from "./app";
import { logger } from "./utils/logger";

const { PORT: port, MONGO_URI: mongouri } = process.env;

app.listen(port, async () => {
  await mongoose.connect(mongouri as string);
  logger.info("connected to mongodb");
  logger.info(`server started on PORT ${port}!`);
});
