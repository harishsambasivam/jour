import express, { NextFunction, Request, Response } from "express";
import { userRouter } from "./components/user/user.router";
import { expect, it } from "vitest";

export const app = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("ok");
});

app.use("/user", userRouter);
