import { NextFunction, Request, Response, Router } from "express";
import { Database } from "../../types/global";
import { UserModel } from "./user.model";
import { User } from "./user.types";
import { UserService } from "./user.service";

export const UserController = function (database: Database) {
  const router = Router();
  const model = UserModel(database);
  const { getUser, addUser } = UserService(model);

  router.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id: userId } = req.params;
        const userData = await getUser(userId);
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
      const resp = await addUser(userData);
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
