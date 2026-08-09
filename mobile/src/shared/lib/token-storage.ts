import * as SecureStore from "expo-secure-store";

const tokenStorage = {
  getToken: (key: string): Promise<string | null> => {
    return SecureStore.getItemAsync(key);
  },

  setToken: (key: string, value: string): Promise<void> => {
    return SecureStore.setItemAsync(key, value);
  },

  clearToken: (key: string): Promise<void> => {
    return SecureStore.deleteItemAsync(key);
  },
};

export { tokenStorage };
