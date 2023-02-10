import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { verifyEmail } from "../../controller/controller_login";
import { IMail, sendMail } from "../../controller/controller_mail";
import connect_db from "../../db/connect_db";
import { bodyMethods, IMethods } from "../../interface/api_interface";
import { IUser } from "../../interface/user_interface";
import USER, { verifyHashPassword } from "../../schema/user_schema";
import { AsyncLocalStorage } from "async_hooks";
const async_store = new AsyncLocalStorage();

export default function logUser(req: NextApiRequest, res: NextApiResponse) {
  const Case: IMethods = {
    POST: async () => {
      const user = req.body as IUser;

      let count_password = 0;
      try {
        connect_db();
        if (!user.email || !user.password)
          return res.status(500).json({ msg: "All fields are required" });

        const find_user = await USER.findOne({ email: user.email });

        if (find_user === null)
          return res.status(500).json({ msg: "User doesnt esxist!" });

        const check_password = await verifyHashPassword(
          user.password,
          find_user.password
        );
        if (!check_password) {
          count_password++;
          async_store.run(count_password, async () => {
            let count = await perfomance();
            console.log(count);
            // if (count_password > 5) {
            //   const update_password = await newPassword(user, USER);

            //   if (update_password) return res.json({ msg: "Password reset!" });
            // } else {
            //   return res.status(200).json({ msg: "Password incorrect!" });
            // }
          });
        }

        return res.status(200).json({ msg: find_user });
      } catch (error) {
        return res.status(500).json({ msg: error });
      }
    },
  };

  bodyMethods(req, res, Case);
}

const perfomance = async () => {
  return (await async_store.getStore()) as number;
};

const newPassword = async (
  user: IUser,
  model: typeof USER
): Promise<boolean> => {
  const new_password = uuidv4();
  const update = await model.findOneAndUpdate(
    { email: user.email },
    { password: new_password }
  );
  const mail: IMail = {
    fromMail: "jonathanjgn99@gmail.com",
    toMail: user.email,
    subject: `${user.username}`,
    message: `Password reset: ${new_password}`,
  };

  if (update) {
    sendMail(mail);

    return true;
  } else {
    return false;
  }
};
