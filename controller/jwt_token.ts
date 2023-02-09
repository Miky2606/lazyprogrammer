import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

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
