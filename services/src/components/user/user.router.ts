import { NextFunction, Request, Response, Router } from "express";
import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../app";

export const userRouter = Router();

userRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("ok");
});

/**
 * API Tests
 *
 */

describe("User Service!", () => {
  it("should respond with a 200 status code", async () => {
    const response = await request(app).get("/user");
    expect(response.statusCode).toBe(200);
  });
});
