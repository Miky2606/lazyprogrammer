import { model, models, Schema } from "mongoose";
import { IUser } from "../../interface/user_interface";

const user = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  code_auth: { type: String, required: true },
});

const USER = models.User || model("User", user);

export default USER;
