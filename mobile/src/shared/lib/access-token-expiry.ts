import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_EXPIRES_KEY = "access_token_expires_at";

const saveAccessTokenExpiry = async (
  expiresAt: string | null | undefined,
): Promise<void> => {
  if (expiresAt) {
    await AsyncStorage.setItem(ACCESS_TOKEN_EXPIRES_KEY, expiresAt);
  } else {
    await AsyncStorage.removeItem(ACCESS_TOKEN_EXPIRES_KEY);
  }
};

const getAccessTokenExpiry = (): Promise<string | null> => {
  return AsyncStorage.getItem(ACCESS_TOKEN_EXPIRES_KEY);
};

const clearAccessTokenExpiry = (): Promise<void> => {
  return AsyncStorage.removeItem(ACCESS_TOKEN_EXPIRES_KEY);
};

export { saveAccessTokenExpiry, getAccessTokenExpiry, clearAccessTokenExpiry };
