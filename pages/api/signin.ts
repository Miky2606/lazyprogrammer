// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { verifyEmail, verifyPassword } from "../../controller/controller_login";

import { IMethods, IStatus } from "../../interface/api_interface";
import { IUser } from "../../interface/user_interface";

export default function createUser(req: NextApiRequest, res: NextApiResponse) {
  const methods: keyof IMethods = req.method as keyof IMethods;

  const Case: IMethods = {
    POST: async () => {
      const user: IUser = req.body as IUser;

      try {
        if (!user.username || !user.email || !user.password)
          return res.status(500).json({ msg: "All fields are required" });
        if (!verifyEmail(user.email))
          return res.status(500).json({ msg: "Email is incorrect!" });
        if (!verifyPassword(user.password))
          return res.status(500).json({ msg: "Password is incorrect!" });

        return res.status(200).json({ msg: "Yes" });
      } catch (error) {
        res.status(400).json({ msg: "Error in Network!!" });
      }
    },
  };

  const response = Case[methods];

  if (response) return response(req, res);
  else return res.status(400).json({ error: "Not Found" });
}
