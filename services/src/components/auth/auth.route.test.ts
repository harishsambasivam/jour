import jwt from "jsonwebtoken";
import supertest from "supertest";
import { describe, expect, it, vi } from "vitest";
import { initApp } from "../../app";
import mongoose from "mongoose";
import { User } from "../user/user.types";
import { UserModel } from "../user/user.model";

const app = await initApp(mongoose);

// #FIXME: https://github.com/auth0/node-jsonwebtoken/pull/876
// vi.spyOn(jwt, "decode").mockReturnValueOnce({} as any);

const UserFactory = UserModel(mongoose);

// #FIXME: how this spys
vi.spyOn(UserFactory, "findById").mockReturnValueOnce({
  username: "john",
  password: "password",
  membership: "Basic",
  _id: "63e7b518579984522632a8bc",
} as any);

describe("POST /auth/refresh", () => {
  it("should return valid tokens", async () => {
    const resp = await supertest(app).post("/auth/refresh").send({
      refreshToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJwYXNzd29yZCI6InBhc3N3b3JkIiwibWVtYmVyc2hpcCI6IkJhc2ljIiwiaWQiOiI2M2U3YjUxODU3OTk4NDUyMjYzMmE4YmMiLCJpYXQiOjE2NzYxMzk0MDYsImV4cCI6MTY3NjMxMjIwNn0.9PW5ji10B_jGmbqb08mXuknVcvzi9wr5CUyA668ult8",
    });
    expect(resp.statusCode).toBe(200);
  });
});

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
