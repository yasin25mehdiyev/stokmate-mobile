import { useRef } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";
import { Typography } from "@/shared/ui/core/typography";
import { SigninForm } from "@/features/auth/signin";
import {
  ServerSettings,
  ServerSettingsTrigger,
} from "@/features/auth/server-settings";

export default function SigninScreen() {
  const { t } = useTranslation("auth");
  const insets = useSafeAreaInsets();

  const sheetRef = useRef<BottomSheetModal>(null);

  const behavior = Platform.OS === "ios" ? "padding" : undefined;

  return (
    <KeyboardAvoidingView behavior={behavior} className="flex-1 bg-background">
      <View
        className="absolute right-3 z-10"
        style={{ top: insets.top + 8 }}
      >
        <ServerSettingsTrigger onPress={() => sheetRef.current?.present()} />
      </View>

      <ScrollView
        contentContainerClassName="grow justify-center px-6 py-10"
        keyboardShouldPersistTaps="handled"
      >
        <View className="mb-10">
          <Typography variant="h4" color="brand" className="mb-1">
            StokMate
          </Typography>

          <Typography variant="h3" color="primary" className="mb-2">
            {t("title")}
          </Typography>

          <Typography variant="p" color="secondary">
            {t("subtitle")}
          </Typography>
        </View>

        <SigninForm />

        <Typography
          variant="caption"
          color="tertiary"
          className="mt-10 text-center"
        >
          {t("footerDisclaimer")}
        </Typography>
      </ScrollView>

      <ServerSettings
        ref={sheetRef}
        onSaved={() => sheetRef.current?.dismiss()}
      />
    </KeyboardAvoidingView>
  );
}
