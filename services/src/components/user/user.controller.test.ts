import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { initApp } from "../../app";
import mongoose from "mongoose";
import { User } from "./user.types";
import { UserDao } from "./user.model";
import { logger } from "../../utils/logger";

logger.level = "error";

// mongoose.connect(process.env.MONGO_URI as string);
const app = await initApp(mongoose);

// spy on the mongoose package to avoid creating users in db
const UserFactory = UserDao(mongoose);

vi.spyOn(UserFactory, "create").mockReturnValueOnce({
  username: "john",
  password: "password",
  membership: "Basic",
  _id: "guduauiyidys",
} as any);

vi.spyOn(UserFactory, "findById").mockReturnValueOnce({
  username: "john",
  password: "password",
  membership: "Basic",
  _id: "63e7b518579984522632a8bc",
} as any);

describe("GET /user/:id", () => {
  it("should respond with a 200 status code", async () => {
    const response = await request(app).get("/user/63e7b518579984522632a8bc");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toEqual("success");
    const responseKeys = Object.keys(response.body.data);
    for (let key of ["username", "password", "membership", "_id"]) {
      expect(responseKeys.includes(key)).toBeTruthy();
    }
    expect(UserFactory.findById).toBeCalledTimes(1);
  });
});

describe("POST /user", () => {
  it("should respond with user object", async () => {
    const userData: User = {
      username: "john",
      password: "password",
      membership: "Basic",
    };
    const response = await request(app).post("/user").send(userData);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toEqual("success");
    expect(response.body.data).toHaveProperty("id");
    expect(UserFactory.create).toBeCalledTimes(1);
  });
});
