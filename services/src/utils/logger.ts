import dotenv from "dotenv";
dotenv.config();

import { pino } from "pino";
export const logger = pino({
  level: process.env.LOG_LEVEL,
});
