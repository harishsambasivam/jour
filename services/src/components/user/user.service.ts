import { logger } from "../../utils/logger";
import { Model } from "mongoose";
import { IUserService, User } from "./user.types";

export function UserService(User: Model<any>): IUserService {
  const addUser = async (user: User) => {
    logger.debug(user, "invoking add user");
    const response = await User.create(user);
    logger.debug({ response });
    return {
      id: response["_id"],
    };
  };

  const getUser = async (userId: string) => {
    logger.debug({ userId }, "invoking add user");
    const response = await User.findById(userId);
    logger.debug({ response });
    return response;
  };

  return { addUser, getUser };
}
