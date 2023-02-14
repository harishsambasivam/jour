import { NextFunction, Request, Response, Router } from "express";
import { Database } from "../../types/global";
import { UserDao } from "./user.model";
import { IUserDAO, IUserService, User } from "./user.types";
import { UserService } from "./user.service";
import { logger } from "../../utils/logger";

export const UserController = function (database: Database) {
  const router = Router();

  // dependency injection of user service and data access layer
  const userDao: IUserDAO = UserDao(database);
  const userService: IUserService = UserService(userDao);
  const { getUserByName, getUserById, addUser } = userService;

  router.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id: userId } = req.params;
        const userData = await getUserById(userId);
        res.status(200).send({
          status: "success",
          data: userData,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    "/name/:name",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { username } = req.params;
        const userData = await getUserByName(username);
        logger.debug(userData);
        res.status(200).send({
          status: "success",
          data: userData ? userData : null,
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
