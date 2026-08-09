import type { AxiosInstance } from "axios";
import { tokenStorage } from "@/shared/lib";
import { ACCESS_TOKEN_KEY } from "@/shared/config/constants";

const attachRequestInterceptor = (client: AxiosInstance) => {
  client.interceptors.request.use(async (config) => {
    const accessToken = await tokenStorage.getToken(ACCESS_TOKEN_KEY);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });
};

export { attachRequestInterceptor };
