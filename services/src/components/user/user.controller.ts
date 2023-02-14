import { NextFunction, Request, Response, Router } from "express";
import { Database } from "../../types/global";
import { UserDao } from "./user.model";
import { IUserDAO, IUserService, User } from "./user.types";
import { UserService } from "./user.service";
import { logger } from "../../utils/logger";

export class UserController {
  router: any;
  userDao: IUserDAO;
  userService: IUserService;

  constructor(database: Database) {
    this.router = Router();
    this.userDao = UserDao(database);
    this.userService = new UserService(this.userDao);
    console.log(this.userService);
    this.router.get("/:id", this.getUserById);
    this.router.get("/name/:name", this.getUserByCreds);
    this.router.post("/", this.createUser);
  }

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const resp = await this.userService.addUser(userData);
      res.status(200).json({
        status: "success",
        data: resp,
      });
    } catch (err) {
      next(err);
    }
  };

  getUserByCreds = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.params;
      const userData = await this.userService.getUserByCreds(
        username,
        password
      );
      logger.debug(userData);
      res.status(200).send({
        status: "success",
        data: userData ? userData : null,
      });
    } catch (err) {
      next(err);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: userId } = req.params;
      const userData = await this.userService.getUserById(userId);
      res.status(200).send({
        status: "success",
        data: userData,
      });
    } catch (err) {
      next(err);
    }
  };
}
