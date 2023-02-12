import { logger } from "../../utils/logger";
import { IUserDAO, IUserService, User } from "./user.types";

export function UserService(User: IUserDAO): IUserService {
  const addUser = async (user: User) => {
    logger.debug(user, "invoking add user");
    const response = await User.create(user);
    logger.debug({ response });
    return {
      id: response["_id"].toString(),
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
