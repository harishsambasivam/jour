import mongoose from "mongoose";
import { UserDao } from "../user/user.model";
import { IUserDAO, User } from "../user/user.types";
import { AuthService } from "./auth.service";
import { AuthTokens } from "./auth.types";
import { describe, expect, it, vi } from "vitest";
import { UserService } from "../user/user.service";

// dependency injecting user service to auth service
const userDao: IUserDAO = UserDao(mongoose);
const { generateTokens } = AuthService(UserService(userDao));

describe("generate tokens", () => {
  it("should generate tokens given user payload", () => {
    const user: User = {
      username: "john",
      password: "password",
      membership: "Basic",
    };
    const tokens: AuthTokens = generateTokens(user);
    expect(tokens.accessToken.length).toBeGreaterThan(0);
    expect(tokens.refreshToken.length).toBeGreaterThan(0);
  });
});
