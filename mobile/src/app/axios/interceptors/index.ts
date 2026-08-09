import type { AxiosInstance } from "axios";
import { attachRequestInterceptor } from "./request.interceptor";
import { attachResponseInterceptor } from "./response.interceptor";

const attachInterceptors = (client: AxiosInstance) => {
  attachRequestInterceptor(client);
  attachResponseInterceptor(client);
};

export { attachInterceptors };
