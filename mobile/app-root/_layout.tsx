import "react-native-gesture-handler";
import "@/shared/i18n/config";
import "@/shared/styles/global.css";

import { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { AlertTriangle } from "lucide-react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import { QueryProvider } from "@/app/providers";
import {
  cancelProactiveRefresh,
  scheduleProactiveRefresh,
} from "@/app/axios/proactive-refresh";
import { clearAccessTokenExpiry } from "@/shared/lib";
import { getSavedApiBaseUrl } from "@/shared/lib/api-base-url-storage";
import { setApiBaseUrl } from "@/shared/api/base-url";
import { useAuthStore } from "@/shared/store";
import { Screen } from "@/shared/ui/custom/screen";
import { EmptyState } from "@/shared/ui/custom/empty-state";
import { Toaster } from "@/shared/ui/custom/toaster";

SplashScreen.preventAutoHideAsync();

const useAuthSideEffects = (isAuthenticated: boolean, isHydrated: boolean) => {
  const wasAuthenticated = useRef(isAuthenticated);

  useEffect(() => {
    if (!isHydrated) return;

    if (wasAuthenticated.current && !isAuthenticated) {
      cancelProactiveRefresh();
      void clearAccessTokenExpiry();
    } else if (!wasAuthenticated.current && isAuthenticated) {
      void scheduleProactiveRefresh();
    }
    wasAuthenticated.current = isAuthenticated;
  }, [isAuthenticated, isHydrated]);

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      void scheduleProactiveRefresh();
    }
    // Only runs once, when hydration first resolves.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated]);
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const isHydrated = useAuthStore((state) => state.isHydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initialize = useAuthStore((state) => state.initialize);
  const [isApiUrlHydrated, setIsApiUrlHydrated] = useState(false);

  useEffect(() => {
    void initialize();
  }, [initialize]);

  useEffect(() => {
    const hydrateApiBaseUrl = async () => {
      try {
        const saved = await getSavedApiBaseUrl();
        if (saved) setApiBaseUrl(saved);
      } catch {
        // No saved override — keep the auto-detected default.
      } finally {
        setIsApiUrlHydrated(true);
      }
    };

    void hydrateApiBaseUrl();
  }, []);

  useAuthSideEffects(isAuthenticated, isHydrated);

  const ready = fontsLoaded && isHydrated && isApiUrlHydrated;

  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryProvider>
          <BottomSheetModalProvider>
            <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
              <StatusBar style="dark" />
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Protected guard={isAuthenticated}>
                  <Stack.Screen name="(app)" />
                </Stack.Protected>
                <Stack.Protected guard={!isAuthenticated}>
                  <Stack.Screen name="(auth)" />
                </Stack.Protected>
              </Stack>
              <Toaster />
            </View>
          </BottomSheetModalProvider>
        </QueryProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export function ErrorBoundary({ retry }: { error: Error; retry: () => void }) {
  const { t } = useTranslation("common", { keyPrefix: "errorBoundary" });

  return (
    <Screen>
      <EmptyState
        icon={
          <View className="size-16 items-center justify-center rounded-full bg-negative-wash">
            <AlertTriangle size={28} color="#eb0b0b" />
          </View>
        }
        title={t("title")}
        description={t("description")}
        actionLabel={t("action")}
        onAction={retry}
      />
    </Screen>
  );
}
