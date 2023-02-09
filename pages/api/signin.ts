// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { verifyUser } from "../../controller/controller_login";
import connect_db from "../../db/connect_db";
import USER from "../../schema/user_schema";

import { bodyMethods, IMethods } from "../../interface/api_interface";
import { IUser } from "../../interface/user_interface";
import { createToken } from "../../controller/jwt_token";
import { IMail, sendMail } from "../../controller/controller_mail";

export default function createUser(req: NextApiRequest, res: NextApiResponse) {
  const Case: IMethods = {
    POST: async () => {
      const user: IUser = req.body as IUser;

      try {
        connect_db();

        if (!verifyUser(user))
          return res.status(200).json({
            msg: "Error in data. Please check your username, email and password",
          });

        const new_user = new USER(user);

        const find = await USER.findOne({
          $or: [{ username: user.username }, { email: user.email }],
        });

        if (find)
          return res.status(200).json({
            msg: "User or Email Exist",
          });

        new_user.save();

        const token = await createToken(new_user._id);

        const mail: IMail = {
          fromMail: "jonathanjgn99@gmail.com",
          toMail: new_user.email,
          subject: `${new_user.username}`,
          message: `Welcome: ${new_user.username}`,
        };

        sendMail(mail);

        return res.status(200).json({ msg: "User Created", token: token });
      } catch (error) {
        res.status(400).json({ msg: "Error in Network!!" + error });
      }
    },
  };

  bodyMethods(req, res, Case);
}
