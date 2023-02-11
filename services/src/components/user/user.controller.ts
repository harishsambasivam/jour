import { logger } from "../../utils/logger";
import { User } from "./user.model";

export const addUser = async (client: unknown, user: unknown) => {
  logger.debug(user, "invoking add user");
  const response = await User.create(user);
  logger.debug(response);
  return response;
};
