import { NextFunction, Request, Response, Router } from "express";
import { addUser } from "./user.controller";

export const UserRouter = function (database: unknown) {
  const router = Router();

  router.get("/", (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).send("ok");
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body;
      const resp = await addUser(database, user);
      res.status(200).json({});
    } catch (err) {
      next(err);
    }
  });

  return router;
};
