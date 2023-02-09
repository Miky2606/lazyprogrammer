import type { NextApiRequest, NextApiResponse } from "next";
import { bodyMethods, IMethods } from "../../interface/api_interface";

export default function logUser(req: NextApiRequest, res: NextApiResponse) {
  const Case: IMethods = {
    GET: () => {
      res.send("hola");
    },
  };

  bodyMethods(req, res, Case);
}
