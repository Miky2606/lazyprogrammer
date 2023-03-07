import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ITemplate } from "../../interface/interface";
import { connect_db } from "../../db/connect_db";
import TemplatesSchema from "../../db/schema/templates_schema";
import USER from "../../db/schema/user_schema";
import {
  badRequest,
  bodyMethods,
  IMethods,
  InternalServerError,
} from "../../interface/api_interface";
import { empty } from "uuidv4";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code_auth, name, description } = req.body;

  await connect_db();
  const methods: IMethods = {
    GET: async () => {
      const { id } = req.headers;
      console.log(id);

      try {
        if (!id) return badRequest(res, "Id is required");

        const find_template = await TemplatesSchema.aggregate([
          {
            $match: {
              autor: new ObjectId(id as string),
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "autor",
              foreignField: "_id",
              as: "user",
            },
          },
        ]);
        console.log(find_template);

        if (find_template.length === 0)
          return badRequest(res, "User doesnt have template!");
        return res.status(200).json({ data: find_template });
      } catch (error) {
        return InternalServerError(res, error as string);
      }
    },
    POST: async () => {
      try {
        if (!code_auth || !name)
          return badRequest(res, "Missing code auth or name");

        const find_user = await USER.findOne({ code_auth: code_auth });
        const find_template = await TemplatesSchema.findOne({ name: name });
        if (!find_user) return badRequest(res, "User doesnt exist!");
        if (find_template) return badRequest(res, "Template exist!");

        const template: ITemplate = {
          name: name,
          autor: find_user._id,
          description: description.length === 0 ? "" : description,
          downloads: 0,
          created: new Date(),
          modified: new Date(),
        };

        const new_template = new TemplatesSchema(template);
        new_template.save();

        return res
          .status(200)
          .json({ data: { user: find_user, id: new_template.id } });
      } catch (error) {
        return InternalServerError(res, error as string);
      }
    },

    PUT: async () => {
      const { id } = req.body;

      try {
        if (!id) return badRequest(res, "Id not exist!");
        const find_template = await TemplatesSchema.findByIdAndUpdate(id, {
          $inc: {
            downloads: 1,
          },
        });

        if (find_template) return res.status(200).json({ data: "Updated!" });
      } catch (error) {
        return InternalServerError(res, error as string);
      }
    },
    DELETE: async () => {
      try {
        const { id } = req.body;

        if (!id) return badRequest(res, "Id doesnt exist!");
        const find_template = await TemplatesSchema.findByIdAndDelete(id);
        console.log(find_template, id);
        if (find_template) return res.status(200).json({ data: "Deleted!" });
        return badRequest(res, "Template doesnt exist!");
      } catch (error) {
        return InternalServerError(res, error as string);
      }
    },
  };

  bodyMethods(req, res, methods);
};
