import { useState } from "react";
import { usePostAuthLogin } from "@/shared/api/generated/auth/auth";
import {
  ACCESS_TOKEN_KEY,
  MIN_LOADING_DURATION_MS,
} from "@/shared/config/constants";
import {
  handleApiError,
  saveAccessTokenExpiry,
  smoothLoading,
  tokenStorage,
} from "@/shared/lib";
import { AuthResponse, useAuthStore } from "@/shared/store";
import { scheduleProactiveRefresh } from "@/app/axios/proactive-refresh";
import { SigninFormValues } from "./schema";

export const useSignin = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const login = useAuthStore((state) => state.login);

  const { mutateAsync } = usePostAuthLogin();

  const handleSignin = async (values: SigninFormValues) => {
    setIsPending(true);

    try {
      const response = (await smoothLoading(
        mutateAsync({ data: values }),
        MIN_LOADING_DURATION_MS,
      )) as AuthResponse;

      await tokenStorage.setToken(ACCESS_TOKEN_KEY, response.accessToken);
      await saveAccessTokenExpiry(response.expiresAt);

      login();
      void scheduleProactiveRefresh();
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsPending(false);
    }
  };

  return {
    handleSignin,
    isPending,
  };
};
