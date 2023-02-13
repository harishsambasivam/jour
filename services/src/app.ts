import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { UserController as UserContoller } from "./components/user/user.controller";
import { Database } from "./types/global";
import { AuthController } from "./components/auth/auth.controller";
import { logger } from "./utils/logger";

export async function initApp(database: Database) {
  const app = express();

  // middlewares
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use("/user", UserContoller(database));
  app.use("/auth", AuthController(database));

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
