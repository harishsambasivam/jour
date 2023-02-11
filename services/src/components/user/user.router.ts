import { NextFunction, Request, Response, Router } from "express";
import { addUser, getUser } from "./user.controller";
import { Database } from "../../types/global";
import { UserModel } from "./user.model";
import { User } from "./user.types";

export const UserRouter = function (database: Database) {
  const router = Router();
  const model = UserModel(database);

  router.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id: userId } = req.params;
        const userData = await getUser(model, userId);
        res.status(200).send({
          status: "success",
          data: userData,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const resp = await addUser(model, userData);
      res.status(200).json({
        status: "success",
        data: resp,
      });
    } catch (err) {
      next(err);
    }
  });

  return router;
};
