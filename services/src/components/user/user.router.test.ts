import { describe, expect, it } from "vitest";
import request from "supertest";
import { initApp } from "../../app";
import mongoose from "mongoose";

const database = mongoose.connect(process.env.MONGO_URI as string);
const app = await initApp(database);

describe("GET /user", () => {
  it("should respond with a 200 status code", async () => {
    const response = await request(app).get("/user");
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /user", () => {
  it("should respond with user object", async () => {
    const response = await request(app)
      .post("/user")
      .send({ username: "john", password: "password" });
    expect(response.statusCode).toBe(200);
  });
});
