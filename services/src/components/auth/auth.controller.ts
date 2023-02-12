import { Model } from "mongoose";
import { getUser } from "../user/user.controller";
import { AuthTokens } from "./auth.types";
import jwt from "jsonwebtoken";
import { User } from "../user/user.types";
import { logger } from "../../utils/logger";
import { getEnv } from "../../config/env";

export default function AuthController(UserModel: Model<any>) {
  function generateTokens(user: User) {
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

  async function refreshTokens(token: string): Promise<AuthTokens> {
    logger.trace({ token }, "invoking refresh tokens");
    // @ts-ignore
    const { id: userId } = jwt.verify(token, getEnv("refreshTokenSecret"));
    const user: User = await getUser(UserModel, userId);
    const { accessToken, refreshToken } = generateTokens(user);
    return {
      accessToken,
      refreshToken,
    };
  }

  return { generateTokens, refreshTokens };
}
