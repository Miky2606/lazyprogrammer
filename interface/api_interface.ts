import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../db/schema/user_schema";

export interface ResponseServer<T> {
  user_data?: T;
  error?: string;
  loading?: boolean;
}

export interface IMethods {
  GET?: Function;
  POST?: Function;
  PUT?: Function;
  DELETE?: Function;
}
export interface ResponseApi<T> {
  data?: T;
  msg?: string;
  error?: string;
}

export interface IJwt {
  id: string;
}

export const bodyMethods = (
  req: NextApiRequest,
  res: NextApiResponse,
  Case: IMethods
) => {
  res.setHeader("Cache-Control", "s-maxage=10");
  const methods: keyof IMethods = req.method as keyof IMethods;

  const response = Case[methods];

  if (response) return response(req, res);
  else return res.status(405).json({ error: "Method not allowed!" });
};

export const badRequest = (res: NextApiResponse, msg: string) => {
  return res.status(400).json({ error: msg });
};

export const InternalServerError = (res: NextApiResponse, msg: string) => {
  return res.status(500).json({ error: msg });
};
