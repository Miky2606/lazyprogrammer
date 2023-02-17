import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { connect_db } from "../../db/connect_db";
import USER from "../../db/schema/user_schema";
import { bodyMethods, IMethods } from "../../interface/api_interface";

export default async (req: NextApiRequest, res: NextApiResponse) => {
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

        if (get_user.length === 0)
          return res.status(201).json({ data: "User doesnt exist" });

        return res.status(200).json({ data: get_user });
      } catch (error) {
        if (error instanceof mongoose.Error)
          return res.status(500).json({ data: error.message });

        return res.status(500).json({ data: error });
      }
    },
  };

  bodyMethods(req, res, methods);
};
