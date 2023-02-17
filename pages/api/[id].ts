import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import TemplatesSchema from "../../db/schema/templates_schema";
import { bodyMethods, IMethods } from "../../interface/api_interface";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const methods: IMethods = {
    GET: async () => {
      try {
        const find_template = await TemplatesSchema.aggregate([
          {
            $match: {
              _id: new ObjectId(id as string),
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
  };

  bodyMethods(req, res, methods);
}
