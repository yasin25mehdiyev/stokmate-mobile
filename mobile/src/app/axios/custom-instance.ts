import type { AxiosRequestConfig } from "axios";
import { axiosInstance } from "@/shared/api/instance";
import { attachInterceptors } from "./interceptors";

attachInterceptors(axiosInstance);

const customInstance = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const { data } = await axiosInstance.request<T>(config);
  return data;
};

export { customInstance };
