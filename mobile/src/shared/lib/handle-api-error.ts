import { isAxiosError } from "axios";
import { toast } from "./toast";

const GENERIC_ERROR_MESSAGE = "Bir hata oluştu.";

const handleApiError = (error: unknown): void => {
  if (!isAxiosError(error)) {
    toast.error(GENERIC_ERROR_MESSAGE);
    return;
  }

  const data = error.response?.data;
  const message = typeof data === "string" ? data.trim() : "";

  toast.error(message || GENERIC_ERROR_MESSAGE);
};

export { handleApiError };
