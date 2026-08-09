import { handleSessionExpired } from "@/shared/lib";
import { HTTP_STATUS } from "@/shared/config/constants";
import { REFRESH_TOKEN_URL, getRefreshedTokens } from "../refresh-token";
import { scheduleProactiveRefresh } from "../proactive-refresh";
import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const LOGIN_URL = "/auth/login";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const attachResponseInterceptor = (client: AxiosInstance) => {
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableRequestConfig;
      const isUnauthorized =
        error.response?.status === HTTP_STATUS.UNAUTHORIZED;
      const isRefreshCall = originalRequest.url?.includes(REFRESH_TOKEN_URL);
      const isLoginCall = originalRequest.url?.includes(LOGIN_URL);

      if (isUnauthorized && isRefreshCall) {
        await handleSessionExpired();
        return Promise.reject(error);
      }

      if (isUnauthorized && isLoginCall) {
        return Promise.reject(error);
      }

      if (isUnauthorized && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          await getRefreshedTokens();
          await scheduleProactiveRefresh();
          return client(originalRequest);
        } catch {
          await handleSessionExpired();
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    },
  );
};

export { attachResponseInterceptor };
