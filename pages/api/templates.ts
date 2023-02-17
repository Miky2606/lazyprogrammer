import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ITemplate } from "../../components/templates/interface";
import { connect_db } from "../../db/connect_db";
import TemplatesSchema from "../../db/schema/templates_schema";
import USER from "../../db/schema/user_schema";
import { bodyMethods, IMethods } from "../../interface/api_interface";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code_auth, name } = req.body;

  await connect_db();
  const methods: IMethods = {
    POST: async () => {
      try {
        if (!code_auth || !name)
          return res.status(200).json({ data: "Missing code auth or name!" });

        const find_user = await USER.findOne({ code_auth: code_auth });
        const find_template = await TemplatesSchema.findOne({ name: name });
        if (!find_user)
          return res.status(201).json({ data: "User doesnt exist!" });
        if (find_template)
          return res
            .status(201)
            .json({ data: "Template exis, use other name!" });

        const template: ITemplate = {
          name: name,
          autor: find_user._id,
          type: "web",
          star: 0,
          downloads: 0,
          created: new Date(),
          modified: new Date(),
        };

        const new_template = new TemplatesSchema(template);
        new_template.save();

        return res.status(200).json({ data: find_user });
      } catch (error) {}
    },
    GET: async () => {
      const { id } = req.headers;

      try {
        if (!id) return res.status(201).json({ data: "Id is required " });

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

        if (find_template.length === 0)
          return res.status(201).json({ data: "User doesnt have template!" });

        return res.status(200).json({ data: find_template });
      } catch (error) {
        res.status(201).json({ data: error });
      }
    },

    PUT: async () => {
      const { id } = req.body;
      try {
        if (!id) return res.status(201).json({ data: "Id doesnt exist!" });
        const find_template = await TemplatesSchema.findByIdAndUpdate(id, {
          $inc: {
            star: 1,
          },
        });

        if (find_template) return res.status(200).json({ data: "Updated!" });
      } catch (error) {
        throw error;
      }
    },
    DELETE: async () => {
      try {
        const { id } = req.body;

        if (!id) return res.status(201).json({ data: "Id doesnt exist!" });
        const find_template = await TemplatesSchema.findByIdAndDelete(id);

        if (find_template) return res.status(200).json({ data: "Deleted!" });
      } catch (error) {
        throw error;
      }
    },
  };

  bodyMethods(req, res, methods);
};
