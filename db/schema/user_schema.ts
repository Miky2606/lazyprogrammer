import { model, models, Schema } from "mongoose";

import { Session } from "next-auth";
import { ObjectType } from "typescript";
import { ITemplate } from "../../components/templates/interface";

export interface IUser extends Session {
  id?: ObjectType | string;
  name?: string;
  email?: string;
  image?: string | null;
  templates?: ITemplate[];
  code_auth?: string;
  user?: IUser;
}

const user = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  code_auth: { type: String, required: true },
});

const USER = models.User || model("User", user);

export default USER;
