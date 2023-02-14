import axios, { AxiosError } from "axios";
import { ResponseApi } from "../interface/api_interface";
import { IUser, LoginData } from "../interface/user_interface";

export const loginUser = async (
  user: LoginData
): Promise<ResponseApi | undefined> => {
  const { API_URL, JWT_SECRET_KEY } = process.env;
  try {
    const response = await axios.post<ResponseApi>(`api/login`, {
      email: user.email,
      password: user.password,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        msg: "",
        error: error.message,
      };
    }
  }
};
