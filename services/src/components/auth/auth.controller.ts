import { Model } from "mongoose";
import { getUser } from "../user/user.controller";
import { AuthTokens } from "./auth.types";
import jwt from "jsonwebtoken";
import { User } from "../user/user.types";
import { logger } from "../../utils/logger";

const {
  ACCESS_TOKEN_SECRET: accessTokenSecret,
  REFRESH_TOKEN_SECRET: refreshTokenSecret,
  ACCESS_TOKEN_TTL: accessTokenTtl,
  REFRESH_TOKEN_TTL: refreshTokenTtl,
} = process.env;

export function generateTokens(user: User) {
  const accessToken = jwt.sign(user, accessTokenSecret as string, {
    expiresIn: accessTokenTtl,
  });
  const refreshToken = jwt.sign(user, refreshTokenSecret as string, {
    expiresIn: refreshTokenTtl,
  });

  const tokens = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };

  logger.trace({ tokens });
  return tokens;
}

export async function refreshTokens(
  UserModel: Model<any>,
  token: string
): Promise<AuthTokens> {
  logger.trace({ token }, "invoking refresh tokens");
  // @ts-ignore
  const { id: userId } = jwt.verify(token, refreshTokenSecret as string);
  const user: User = await getUser(UserModel, userId);
  const { accessToken, refreshToken } = generateTokens(user);
  return {
    accessToken,
    refreshToken,
  };
}
