import { afterAll, beforeAll } from "vitest";
import { logger } from "./logger";

beforeAll(() => {
  logger.level = "debug";
});

afterAll(() => {
  logger.level = (process.env.LOG_LEVEL as string) || "error";
});
