import { getEnv } from "../../config/env";
import { logger } from "../../utils/logger";
import { IUserDAO, IUserService, User } from "./user.types";
import bcrypt from "bcrypt";

export function UserService(User: IUserDAO): IUserService {
  const hashPassword = async (password: string): Promise<string> => {
    try {
      const saltRounds = parseInt(getEnv("saltRounds"));
      const hash = await bcrypt.hash(password, 10);
      return hash;
    } catch (err) {
      logger.error(err);
    }
    return "";
  };

  const addUser = async (user: User) => {
    logger.debug(user, "invoking add user");

    // hash the password before storing
    // user["password"] = await hashPassword(user.password!);

    const response = await User.create(user);
    logger.debug({ response });
    return {
      id: response["_id"].toString(),
    };
  };

  const getUserById = async (userId: string) => {
    logger.debug({ userId }, "invoking add user");
    const response = await User.findById(userId);
    logger.debug({ response });
    return response;
  };

  const getUserByName = async (userName: string) => {
    logger.debug({ userName }, "invoking add user");
    const response = await User.findOne({ userName });
    logger.debug({ response });
    return response;
  };

  return { addUser, getUserById, getUserByName, hashPassword };
}
