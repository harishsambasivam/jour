import mongoose from "mongoose";
import { Database } from "../../types/global";

type membership = "Pro" | "Basic";

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  membership: String,
});

export const UserModel = function (database: Database) {
  return database.model("User", UserSchema, "users");
};
