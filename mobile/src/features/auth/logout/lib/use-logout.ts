import { usePostAuthLogout } from "@/shared/api/generated/auth/auth";
import { useAuthStore } from "@/shared/store";

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);

  const { mutate, isPending } = usePostAuthLogout({
    mutation: {
      onSettled: () => {
        logout();
      },
    },
  });

  const handleLogout = () => mutate({ data: {} });

  return { handleLogout, isPending };
};
