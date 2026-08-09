import { create } from "zustand";
import { tokenStorage } from "@/shared/lib/token-storage";
import { clearStorage } from "@/shared/lib/clear-storage";
import { ACCESS_TOKEN_KEY } from "@/shared/config/constants";

type AuthResponse = {
  accessToken: string;
  expiresAt?: string | null;
};

interface AuthState {
  isAuthenticated: boolean;
  isHydrated: boolean;
  initialize: () => Promise<void>;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isHydrated: false,

  initialize: async () => {
    const token = await tokenStorage.getToken(ACCESS_TOKEN_KEY);
    set({ isAuthenticated: !!token, isHydrated: true });
  },

  login: () => set({ isAuthenticated: true }),

  logout: () => {
    set({ isAuthenticated: false });
    void clearStorage();
  },
}));

export { useAuthStore, type AuthResponse };
