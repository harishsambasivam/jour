import { Model } from "mongoose";
import { User } from "../user/user.types";
import AuthService from "./auth.service";
import { AuthTokens } from "./auth.types";
import { describe, expect, it, vi } from "vitest";

const { generateTokens } = AuthService(Model);

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
