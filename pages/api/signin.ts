// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { verifyUser } from "../../controller/controller_login";
import connect_db from "../../db/connect_db";
import USER from "../../schema/user_schema";
import cookie from "cookie";
import { bodyMethods, IMethods } from "../../interface/api_interface";
import { IUser } from "../../interface/user_interface";
import { createToken } from "../../controller/jwt_token";
import { IMail, sendMail } from "../../controller/controller_mail";
import { createFolder } from "../../controller/controller_fs";

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
        new_user.created = new Date();
        new_user.count_password_incorrect = 0;

        // Find User By Username and Email
        const find = await USER.findOne({
          $or: [{ username: user.username }, { email: user.email }],
        });

        //Check the find
        if (find)
          return res.status(200).json({
            msg: "User or Email Exist",
          });

        //Create Folder Users
        await createFolder(new_user.username);

        //Save the user
        const save = await new_user.save();

        //Send the email and create the token
        if (save) {
          const token = await createToken(new_user._id);

          const mail: IMail = {
            fromMail: "jonathanjgn99@gmail.com",
            toMail: new_user.email,
            subject: `${new_user.username}`,
            message: `Welcome: ${new_user.username}`,
          };

          sendMail(mail);

          res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "strict",
              maxAge: 3600,
              path: "/",
            })
          );

          return res.status(200).json({ msg: "User Created", token: token });
        }
      } catch (error) {
        res.status(500).json({ msg: "Error in Network!!" + error });
      }
    },
  };

  bodyMethods(req, res, Case);
}
