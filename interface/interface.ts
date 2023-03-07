import { ObjectType } from "typescript";
import { IUser } from "../db/schema/user_schema";

export type template_type = "web" | "app" | "file";

export interface ITemplate {
  _id?: ObjectType | string;
  name: string;
  autor?: ObjectType;
  description: string;
  downloads: number;
  created: Date;
  modified: Date;
  user?: IUser[];
}
