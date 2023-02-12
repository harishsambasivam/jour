import { NextFunction, Request, Response, Router } from "express";
import { Database } from "../../types/global";
import { AuthTokens } from "./auth.types";
import { UserModel } from "../user/user.model";
import { User } from "../user/user.types";
import AuthService from "./auth.service";
import { UserService } from "../user/user.service";
const router = Router();

export function AuthController(database: Database) {
  const model = UserModel(database);
  const { refreshTokens, generateTokens } = AuthService(UserService(model));
  router.post(
    "/refresh",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { refreshToken } = req.body;
        const tokens: AuthTokens = await refreshTokens(refreshToken);
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
