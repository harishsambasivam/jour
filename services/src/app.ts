import express, { NextFunction, Request, Response } from "express";
import { UserRouter } from "./components/user/user.router";
import { Database } from "./types/global";
import { AuthRouter } from "./components/auth/auth.route";
import { logger } from "./utils/logger";

export async function initApp(database: Database) {
  const app = express();

  // middlewares
  app.use(express.json());

  // Routes
  app.use("/user", UserRouter(database));
  app.use("/auth", AuthRouter(database));

  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("ok");
  });

  // global error handler
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  });

  return app;
}
