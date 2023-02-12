import mongoose from "mongoose";
import { Database } from "../../types/global";
import { IUserDAO } from "./user.types";

type membership = "Pro" | "Basic";

// mongoose collection schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  membership: String,
});

export const UserDao = function (database: Database): IUserDAO {
  return database.model("User", UserSchema, "users");
};
