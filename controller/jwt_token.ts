import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { IJwt } from "../interface/api_interface";

const { JWT_SECRET_KEY } = process.env;

export const createToken = async (id: ObjectId): Promise<string> => {
  try {
    return await jwt.sign({ id: id }, JWT_SECRET_KEY as string, {
      expiresIn: "1y",
    });
  } catch (error) {
    throw "Error" + error;
  }
};

export const verifyToken = async (token: string): Promise<string | IJwt> => {
  try {
    return (await jwt.verify(token, JWT_SECRET_KEY as string)) as IJwt;
  } catch (error) {
    if (error instanceof JsonWebTokenError) return error.message;
    return error as string;
  }
};
