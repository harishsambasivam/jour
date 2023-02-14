import { Model } from "mongoose";

export type User = {
  id?: string;
  username: string;
  password?: string;
  membership: "Pro" | "Basic";
};

export interface IUserService {
  getUserById: (id: string) => Promise<any>;
  getUserByCreds: (username: string, password: string) => Promise<any>;
  addUser: (user: User) => Promise<{ id: string }>;
  hashPassword: (password: string) => Promise<string>;
}

export type IUserDAO = Model<any>;
