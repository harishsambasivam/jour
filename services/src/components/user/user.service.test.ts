import { describe, expect, it, vi } from "vitest";
import { UserDao } from "./user.model";
import mongoose from "mongoose";
import { IUserDAO, IUserService } from "./user.types";
import { UserService } from "./user.service";

const userDao: IUserDAO = UserDao(mongoose);
const userService: IUserService = new UserService(userDao);
const { hashPassword } = userService;

describe("Hash Password", () => {
  // it("should hash the password", async () => {
  //   expect(await hashPassword("test").length).toBeGreaterThan(0);
  // });
});
