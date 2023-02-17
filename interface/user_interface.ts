import { ObjectID } from "bson";
import { Session } from "next-auth";
import { ObjectType } from "typescript";
import { ITemplate } from "../components/templates/interface";

export interface IUser extends Session {
  id?: ObjectType | string;
  name?: string;
  email?: string;
  image?: string | null;
  templates?: ITemplate[];
  code_auth?: string;
  user?: IUser;
}
