import mongoose, { Schema } from "mongoose";
import { IUser } from "../interface/user_interface";
import bcrypt from "bcrypt";

const user = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created: { type: Date, required: true },
});

user.pre("save", async function () {
  this.created = new Date();
  this.password = await hashPassword(this.password);
});

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

// const USER: Model<IUser> = mongoose.models.user
//   ? mongoose.model("User", user)
//   : mongoose.models.user;

const USER = mongoose.model("User", user);

export default USER;
