import { ObjectId } from "mongodb";
import { ObjectType } from "typescript";
import { IUser } from "../../interface/user_interface";

export type template_type = "web" | "app" | "file";

export interface ITemplate {
  _id?: ObjectType | string;
  name: string;
  autor?: ObjectType;
  type: template_type;
  star: number;
  downloads: number;
  created: Date;
  modified: Date;
  user?: IUser[];
}

export const template_fake: ITemplate[] = [
  {
    _id: "1",
    name: "React",

    type: "web",
    star: 5,
    downloads: 1200,
    created: new Date(),
    modified: new Date(),
  },
  {
    _id: "2",
    name: "NextJS",

    type: "web",
    star: 5,
    downloads: 1200,
    created: new Date(),
    modified: new Date(),
  },
  {
    _id: "3",
    name: "Tailwind Nextjs",

    type: "web",
    star: 5,
    downloads: 1200,
    created: new Date(),
    modified: new Date(),
  },
];
