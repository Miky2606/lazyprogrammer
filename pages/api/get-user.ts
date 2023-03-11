import mongoose from "mongoose";
import next, { NextApiRequest, NextApiResponse } from "next";
import { connect_db } from "../../db/connect_db";
import USER from "../../db/schema/user_schema";
import {
  badRequest,
  bodyMethods,
  IMethods,
  InternalServerError,
} from "../../interface/api_interface";

export default async function UsersApi(req: NextApiRequest, res: NextApiResponse){
  await connect_db();
  const { name } = req.headers;

  const methods: IMethods = {
    GET: async () => {
      try {
        const get_user = await USER.aggregate([
          {
            $match: {
              name: name,
            },
          },
          {
            $lookup: {
              from: "templates",
              localField: "_id",
              foreignField: "autor",
              as: "templates",
            },
          },
        ]);

        if (get_user.length === 0) return badRequest(res, "User doesnt exist");

        return res.status(200).json({ data: get_user });
      } catch (error) {
        return InternalServerError(res, error as string);
      }
    },
  };

  bodyMethods(req, res, methods);
};
