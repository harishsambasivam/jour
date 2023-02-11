import { logger } from "../../utils/logger";
import { Model } from "mongoose";
import { User } from "./user.types";

export const addUser = async (User: Model<any>, user: User) => {
  logger.debug(user, "invoking add user");
  const response = await User.create(user);
  logger.debug({ response });
  return response;
};

export const getUser = async (User: Model<any>, userId: string) => {
  logger.debug({ userId }, "invoking add user");
  const response = await User.findById(userId);
  logger.debug({ response });
  return response;
};
