import { ObjectId } from "mongodb";
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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connect_db();
  const methods: IMethods = {
    GET: async () => {
      const { id } = req.query;

      try {
        if (!id) return badRequest(res, "Id is required");

        const find_template = await TemplatesSchema.aggregate([
          {
            $match: {
              name: id,
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
          return badRequest(res, "Template doesn't exist!");
        return res.status(200).json({ data: find_template });
      } catch (error) {
        return InternalServerError(res, error as string);
      }
    },
  };

  return bodyMethods(req, res, methods);
};
