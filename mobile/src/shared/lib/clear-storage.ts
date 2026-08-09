import { ACCESS_TOKEN_KEY } from "../config/constants";
import { tokenStorage } from "./token-storage";

const clearStorage = (): Promise<void> => {
  return tokenStorage.clearToken(ACCESS_TOKEN_KEY);
};

export { clearStorage };
