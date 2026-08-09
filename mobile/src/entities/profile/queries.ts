import { useGetAuthMe } from "@/shared/api/generated/auth/auth";
import type { User } from "./types";
import { STALE_TIME_MS } from "@/shared/config/constants";

export const useGetCurrentUser = () => {
  const { data, isPending, error } = useGetAuthMe({
    query: { staleTime: STALE_TIME_MS },
  });
  
  const response = data as User;

  return { response, isLoading: isPending, error };
};
