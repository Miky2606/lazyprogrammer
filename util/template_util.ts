import axios, { AxiosError, AxiosResponse } from "axios";
import { ITemplate } from "../interface/interface";
import { ResponseApi } from "../interface/api_interface";

export const getAllTemplates = async <T>(): Promise<ResponseApi<T>> => {
  try {
    const response = await axios.get<{ data: ITemplate[] | string }>(
      `${process.env.API_URL}/get-all-templates`
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
    }

    return {
      error: "Error in network",
    };
  }
};

export const getTemplateInfo = async <T>(
  id: string
): Promise<ResponseApi<T>> => {
  try {
    const response = await axios.get<{ data: ITemplate[] | string }>(
      `${process.env.API_URL}/${id}`
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

export const deleteTemplate = async <T>(id: string) => {
  try {
    const response = await axios.delete<{ data: string }>(
      `${process.env.API_URL}/templates`,
      {
        data: {
          id: id,
        },
      }
    );
    return response_get(response);
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        error: error.message,
      };
    }

    return {
      error: "Error in network",
    };
  }
};

export const response_get = <T>(response: AxiosResponse): ResponseApi<T> => {
  let res: ResponseApi<T>;
  if (response.status !== 200) {
    res = {
      error: response.data.data as string,
    };
    return res;
  }

  res = {
    data: response.data.data as T,
  };

  return res;
};
