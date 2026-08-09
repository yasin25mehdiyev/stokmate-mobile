import axios from "axios";
import { getApiBaseUrl, onApiBaseUrlChange } from "./base-url";

export const axiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
});

onApiBaseUrlChange((url) => {
  axiosInstance.defaults.baseURL = url;
});
