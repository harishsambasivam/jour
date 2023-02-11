import { NextFunction, Request, Response, Router } from "express";
import { Database } from "../../types/global";
import { AuthTokens } from "./auth.types";
import { UserModel } from "../user/user.model";
import { generateTokens, refreshTokens } from "./auth.controller";
import { logger } from "../../utils/logger";
import { User } from "../user/user.types";
const router = Router();

export function AuthRouter(database: Database) {
  const model = UserModel(database);

  router.post(
    "/refresh",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { refreshToken } = req.body;
        const tokens: AuthTokens = await refreshTokens(model, refreshToken);
        res.status(200).json({
          status: "success",
          data: tokens,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    "/login",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user: User = req.body;
        const data: AuthTokens = generateTokens(user);
        res.status(200).json({
          status: "success",
          data,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
}
