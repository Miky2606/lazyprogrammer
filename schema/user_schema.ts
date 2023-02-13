import { model, models, Schema } from "mongoose";
import { IUser } from "../interface/user_interface";
import bcrypt from "bcrypt";

const user = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created: { type: Date, required: true },
  count_password_incorrect: { type: Number, required: true },
});

user.set("toJSON", {
  transform: (document, returned) => {
    returned.id = returned._id;
    delete returned._id;
    delete returned.__v;
    delete returned.password;
    delete returned.count_password_incorrect;
  },
});

user.pre("save", async function () {
  this.password = await hashPassword(this.password);
});

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const verifyHashPassword = async (
  password: string,
  passwordHash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, passwordHash);
};

const USER = models.User || model("User", user);

export default USER;
