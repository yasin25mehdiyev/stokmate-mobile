import { env } from "@/shared/config/env";

// Holds the *effective* API base URL for the running session. Defaults to the
// dev auto-detected value; can be overridden at runtime (see the server-url
// settings sheet on the sign-in screen) for standalone builds where there is
// no Metro connection to auto-detect a host from.
let currentBaseUrl = env.apiBaseUrl;
const listeners = new Set<(url: string) => void>();

export const getApiBaseUrl = (): string => currentBaseUrl;

export const setApiBaseUrl = (url: string): void => {
  currentBaseUrl = url;
  listeners.forEach((listener) => listener(url));
};

export const onApiBaseUrlChange = (listener: (url: string) => void): (() => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
