import axios from "axios";
import { getApiBaseUrl, onApiBaseUrlChange } from "@/shared/api/base-url";
import { ACCESS_TOKEN_KEY } from "@/shared/config/constants";
import { saveAccessTokenExpiry, tokenStorage } from "@/shared/lib";

export const REFRESH_TOKEN_URL = "/auth/refresh";

const refreshClient = axios.create({ baseURL: getApiBaseUrl(), withCredentials: true });

onApiBaseUrlChange((url) => {
  refreshClient.defaults.baseURL = url;
});

let refreshPromise: Promise<void> | null = null;

const refreshTokens = async (): Promise<void> => {
  const { data } = await refreshClient.post<{
    accessToken: string;
    expiresAt: string | null;
  }>(REFRESH_TOKEN_URL, {});

  if (!data.accessToken) {
    throw new Error("Yenileme yanıtında erişim anahtarı eksik.");
  }

  await tokenStorage.setToken(ACCESS_TOKEN_KEY, data.accessToken);
  await saveAccessTokenExpiry(data.expiresAt);
};

const getRefreshedTokens = (): Promise<void> => {
  if (!refreshPromise) {
    refreshPromise = refreshTokens().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

export { refreshTokens, getRefreshedTokens };
