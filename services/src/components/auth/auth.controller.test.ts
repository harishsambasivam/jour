// import jwt from "jsonwebtoken";
import supertest from "supertest";
import { describe, expect, it, vi } from "vitest";
import { initApp } from "../../app";
import mongoose from "mongoose";
import { User } from "../user/user.types";
import { UserDao } from "../user/user.model";

const app = await initApp(mongoose);

// #FIXME: https://github.com/auth0/node-jsonwebtoken/pull/876
// vi.spyOn(jwt, "decode").mockReturnValueOnce({} as any);

const userDao = UserDao(mongoose);

// #FIXME: how this spys
vi.spyOn(userDao, "findById").mockReturnValueOnce({
  toObject: () => ({
    username: "john",
    password: "password",
    membership: "Basic",
    _id: "63e7b518579984522632a8bc",
  }),
} as any);

vi.spyOn(userDao, "findOne").mockReturnValueOnce({
  toObject: () => ({
    username: "john",
    password: "password",
    membership: "Basic",
    _id: "63e7b518579984522632a8bc",
  }),
} as any);

// describe("POST /auth/refresh", () => {
//   it("should return valid tokens", async () => {
//     const resp = await supertest(app).post("/auth/refresh").send({
//       refreshToken: "",
//     });
//     expect(resp.statusCode).toBe(200);
//   });
// });

describe("POST /auth/login", () => {
  it("should return valid tokens on successfull login", async () => {
    const userData: User = {
      username: "john",
      password: "password",
      membership: "Basic",
      id: "63e7b518579984522632a8bc",
    };
    const resp = await supertest(app).post("/auth/login").send(userData);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toHaveProperty("status");
    expect(resp.body).toHaveProperty("data");
    expect(resp.body.data).toHaveProperty("accessToken");
    expect(resp.body.data).toHaveProperty("refreshToken");
    expect(resp.body.data.refreshToken.length).toBeGreaterThan(0);
    expect(resp.body.data.accessToken.length).toBeGreaterThan(0);
  });
});
