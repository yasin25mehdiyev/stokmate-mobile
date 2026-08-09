import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL_STORAGE_KEY = "api_base_url_override";

export const getSavedApiBaseUrl = (): Promise<string | null> => {
  return AsyncStorage.getItem(API_BASE_URL_STORAGE_KEY);
};

export const saveApiBaseUrl = (url: string): Promise<void> => {
  return AsyncStorage.setItem(API_BASE_URL_STORAGE_KEY, url);
};

export const clearSavedApiBaseUrl = (): Promise<void> => {
  return AsyncStorage.removeItem(API_BASE_URL_STORAGE_KEY);
};
