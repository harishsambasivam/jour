import { getEnv } from "../../config/env";
import { logger } from "../../utils/logger";
import { IUserDAO, IUserService, User } from "./user.types";
import bcrypt from "bcrypt";

export class UserService {
  User: IUserDAO;

  constructor(user: IUserDAO) {
    this.User = user;
  }

  public hashPassword = async (password: string): Promise<string> => {
    try {
      const saltRounds = parseInt(getEnv("saltRounds"));
      const hash = await bcrypt.hash(password, 10);
      return hash;
    } catch (err) {
      logger.error(err);
    }
    return "";
  };

  public addUser = async (user: User) => {
    logger.debug(user, "invoking add user");

    // hash the password before storing
    // user["password"] = await hashPassword(user.password!);

    const response = await this.User.create(user);
    logger.debug({ response });
    return {
      id: response["_id"].toString(),
    };
  };

  public getUserById = async (userId: string) => {
    logger.debug({ userId }, "invoking get user by ID");
    const response = await this.User.findById(userId);
    logger.debug({ response });
    return response.toObject();
  };

  public getUserByCreds = async (userName: string, password: string) => {
    logger.debug(
      { userName, password },
      "invoking get user by name and password"
    );
    logger.debug(this.User);
    const response = await this.User.findOne({
      username: userName,
      password: password,
    });
    logger.debug({ response });
    return response.toObject();
  };
}
