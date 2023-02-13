import type { NextApiRequest, NextApiResponse } from "next";
import { IMail, sendMail } from "../../controller/controller_mail";
import { createToken } from "../../controller/jwt_token";
import connect_db from "../../db/connect_db";
import { bodyMethods, IMethods } from "../../interface/api_interface";
import { IUser } from "../../interface/user_interface";
import USER, {
  hashPassword,
  verifyHashPassword,
} from "../../schema/user_schema";
import cookie from "cookie";

export default function logUser(req: NextApiRequest, res: NextApiResponse) {
  const Case: IMethods = {
    POST: async () => {
      const user = req.body as IUser;

      try {
        connect_db();
        if (!user.email || !user.password)
          return res.status(200).json({ msg: "All fields are required" });

        const find_user = await USER.findOne({ email: user.email });

        if (find_user === null)
          return res.status(200).json({ msg: "User doesnt esxist!" });

        const check_password = await verifyHashPassword(
          user.password,
          find_user.password
        );
        if (!check_password) {
          let count = find_user.count_password_incorrect + 1;
          console.log(count);
          await find_user.updateOne({ count_password_incorrect: count });

          if (find_user.count_password_incorrect >= 5) {
            const update_password = await newPassword(find_user, USER);
            await find_user.updateOne({ count_password_incorrect: 0 });

            if (update_password) return res.json({ msg: "Password reset!" });
          } else {
            return res.status(200).json({ msg: "Password incorrect!" });
          }

          return res
            .status(200)
            .json({ msg: "Password incorrect", user: find_user });
        }

        const token = await createToken(find_user._id);

        if (token)
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
        return res.status(200).json({ msg: "Logged" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error });
      }
    },
  };

  bodyMethods(req, res, Case);
}

const newPassword = async (
  user: IUser,
  model: typeof USER
): Promise<boolean> => {
  const random = Math.floor(Math.random() * 100000) + 100000;
  const new_password = `${user.username}${random}`;
  const update = await model.findOneAndUpdate(
    { email: user.email },
    { password: await hashPassword(new_password) }
  );
  const mail: IMail = {
    fromMail: "jonathanjgn99@gmail.com",
    toMail: user.email,
    subject: `Password reset for :${user.username}`,
    message: `New Password: ${new_password}`,
  };

  if (update) {
    sendMail(mail);

    return true;
  } else {
    return false;
  }
};
