import { NextApiRequest, NextApiResponse } from "next";

export interface IMethods {
  GET?: Function;
  POST?: Function;
  PUT?: Function;
  DELETE?: Function;
}

export interface ResponseApi {
  msg: string;
  token?: string | undefined;
  error?: string | undefined;
}

export const bodyMethods = (
  req: NextApiRequest,
  res: NextApiResponse,
  Case: IMethods
) => {
  const methods: keyof IMethods = req.method as keyof IMethods;

  const response = Case[methods];

  if (response) return response(req, res);
  else return res.status(400).json({ error: "Not Found" });
};
