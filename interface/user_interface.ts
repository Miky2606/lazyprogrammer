import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  id?: string;
  username: string;
  email: string;
  password: string;
  created: Date;
  confirmPassword?: () => boolean;
}
