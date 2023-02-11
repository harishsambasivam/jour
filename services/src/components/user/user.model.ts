import mongoose from "mongoose";

type membership = "Pro" | "Basic";

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  membership: String,
});

export const User = mongoose.model("User", UserSchema, "users");
