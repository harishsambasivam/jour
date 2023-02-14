import jwt from "jsonwebtoken";
import { IAuthService, AuthTokens } from "./auth.types";
import { IUserService, User } from "../user/user.types";
import { logger } from "../../utils/logger";
import { getEnv } from "../../config/env";

export function AuthService(UserService: IUserService): IAuthService {
  async function refreshTokens(token: string): Promise<AuthTokens> {
    logger.trace({ token }, "invoking refresh tokens");
    // @ts-ignore
    const { id: userId } = jwt.verify(token, getEnv("refreshTokenSecret"));
    const user: User = await UserService.getUserById(userId);
    const { accessToken, refreshToken } = generateTokens(user);
    return {
      accessToken,
      refreshToken,
    };
  }

  function generateTokens(user: User) {
    // #FIXME: performance improvement
    delete user.password;

    const accessToken = jwt.sign(user, getEnv("accessTokenSecret"), {
      expiresIn: getEnv("accessTokenTtl"),
    });
    const refreshToken = jwt.sign(user, getEnv("refreshTokenSecret"), {
      expiresIn: getEnv("refreshTokenTtl"),
    });

    const tokens = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    logger.trace({ tokens });
    return tokens;
  }

  function verifyAccessToken(accessToken: string): boolean {
    try {
      var decoded = jwt.verify(accessToken, getEnv("accessTokenSecret"));
      logger.trace(decoded);
      return true;
    } catch (err) {
      logger.error(err);
      return false;
    }
  }

  function verifyRefreshToken(accessToken: string): boolean {
    return true;
  }

  return { generateTokens, refreshTokens, verifyAccessToken };
}
