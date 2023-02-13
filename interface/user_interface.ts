import mongoose from "mongoose";
import { ObjectType } from "typescript";

export interface IUser extends mongoose.Document {
  id?: ObjectType;
  username: string;
  email: string;
  password: string;
  created: Date;
  count_password_incorrect: number;
  confirmPassword?: () => boolean;
}

export type LoginData = Pick<IUser, "email" | "password">;
