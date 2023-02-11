import { User } from "../model/user";

export const addUser = (user: unknown) => {
  const response = new User(user);
  return response;
};
