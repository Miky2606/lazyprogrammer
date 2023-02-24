import axios, { AxiosError } from "axios";
import { IUser } from "../db/schema/user_schema";
import { ResponseApi } from "../interface/api_interface";
import { response_get } from "./template_util";

export const getUserInfo = async <T>(name: string): Promise<ResponseApi<T>> => {
  try {
    const response = await axios.get<{ data: IUser[] | string }>(
      `${process.env.API_URL}/get-user` ?? "none",
      {
        headers: {
          name: name,
        },
      }
    );

    return response_get(response);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        return {
          error: error.response?.data.error,
          msg: error.request.status,
        };
      }

      return {
        error: error.message,
      };
    }

    return {
      error: "Error in network",
    };
  }
};
