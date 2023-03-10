import { NextFunction, Request, Response, Router } from "express";
import { Database } from "../../types/global";
import { AuthTokens, IAuthService } from "./auth.types";
import { UserDao } from "../user/user.model";
import { IUserDAO, User } from "../user/user.types";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { logger } from "../../utils/logger";
const router = Router();

export function AuthController(database: Database) {
  // dependency injection of user service and user data access layer
  const userDao: IUserDAO = UserDao(database);
  const userService = new UserService(userDao);
  const { refreshTokens, generateTokens }: IAuthService =
    AuthService(userService);

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
        logger.debug("/auth/loging invoking controller");
        const { username, password }: User = req.body;
        const user: User = await userService.getUserByCreds(
          username,
          password!
        );
        logger.debug(user);
        if (!user)
          return res.status(401).json({
            status: "error",
            data: "invalid login creds",
          });
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
