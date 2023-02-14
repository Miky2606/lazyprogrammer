import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../controller/jwt_token";
import { bodyMethods, IJwt, IMethods } from "../../interface/api_interface";
import USER from "../../schema/user_schema";


export default function GetUser(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.headers;

  if (token === undefined)
    return res.status(301).json({ msg: "Error token doesn't found!" });
  const methods: IMethods = {
    GET: async () => {
      try {
        const id = (await verifyToken(token as string)) as IJwt;
        const find_user_id = await USER.findById({ _id: id.id });

        if (!find_user_id)
          return res
            .status(301)
            .json({ msg: "Error token doesn't found maybe is expired!" });

        return res.status(200).json({ msg: find_user_id });
      } catch (error) {
        return res.status(500).json({ msg: `Error in network ${error}` });
      }
    },
  };

  bodyMethods(req, res, methods);
}
