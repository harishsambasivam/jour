import pino from "pino";
import { getEnv } from "../config/env";

const pinoLogger = pino({
  browser: { asObject: true },
  level: "trace",
});
pinoLogger.level = getEnv("logLevel");
export const logger = pinoLogger;
