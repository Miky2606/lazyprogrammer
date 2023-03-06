import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { connect_db } from "../../db/connect_db";
import TemplatesSchema from "../../db/schema/templates_schema";
import {
  badRequest,
  bodyMethods,
  IMethods,
  InternalServerError,
} from "../../interface/api_interface";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  connect_db();
  const methods: IMethods = {
    GET: async () => {
      try {
        const find_template = await TemplatesSchema.aggregate([
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
          return badRequest(res, "No Tenmplates created!");

        return res.status(200).json({ data: find_template });
      } catch (error) {
        if (error instanceof mongoose.Error)
          return InternalServerError(res, error.message);
        return InternalServerError(res, error as string);
      }
    },
  };

  bodyMethods(req, res, methods);
}
