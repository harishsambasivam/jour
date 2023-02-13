import { Model } from "mongoose";

export type User = {
  id?: string;
  username: string;
  password?: string;
  membership: "Pro" | "Basic";
};

export interface IUserService {
  getUser: (id: string) => Promise<any>;
  addUser: (user: User) => Promise<{ id: string }>;
  hashPassword: (password: string) => Promise<string>;
}

export type IUserDAO = Model<any>;
