import Constants from "expo-constants";

const API_PORT = 5080;

const inferDevApiBaseUrl = (): string | undefined => {
  const hostUri =
    Constants.expoConfig?.hostUri ?? Constants.expoGoConfig?.debuggerHost;
  const host = hostUri?.split(":")[0];

  return host ? `http://${host}:${API_PORT}` : undefined;
};

export const env = {
  apiBaseUrl:
    process.env.EXPO_PUBLIC_API_BASE_URL ??
    inferDevApiBaseUrl() ??
    `http://localhost:${API_PORT}`,
} as const;
