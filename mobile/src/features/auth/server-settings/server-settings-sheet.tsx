import { forwardRef, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";

import { getApiBaseUrl, setApiBaseUrl } from "@/shared/api/base-url";
import {
  clearSavedApiBaseUrl,
  saveApiBaseUrl,
} from "@/shared/lib/api-base-url-storage";
import { env } from "@/shared/config/env";
import { toast } from "@/shared/lib";
import { Typography } from "@/shared/ui/core/typography";
import { Input } from "@/shared/ui/core/input";
import { Button } from "@/shared/ui/core/button";
import { SheetBackdrop } from "@/shared/ui/custom/bottom-sheet";

const URL_PATTERN = /^https?:\/\/.+/;

interface ServerSettingsSheetProps {
  onSaved: () => void;
}

const ServerSettingsSheet = forwardRef<BottomSheetModal, ServerSettingsSheetProps>(
  ({ onSaved }, ref) => {
    const { t } = useTranslation("auth", { keyPrefix: "serverSettings" });
    const insets = useSafeAreaInsets();

    const [url, setUrl] = useState(() => getApiBaseUrl());
    const [error, setError] = useState(false);

    const handleSave = () => {
      const trimmed = url.trim();
      if (!URL_PATTERN.test(trimmed)) {
        setError(true);
        return;
      }

      setError(false);
      setApiBaseUrl(trimmed);
      void saveApiBaseUrl(trimmed);
      toast.success(t("saved"));
      onSaved();
    };

    const handleReset = () => {
      setApiBaseUrl(env.apiBaseUrl);
      void clearSavedApiBaseUrl();
      setUrl(env.apiBaseUrl);
      setError(false);
      toast.success(t("saved"));
      onSaved();
    };

    return (
      <BottomSheetModal
        ref={ref}
        enableDynamicSizing
        backdropComponent={SheetBackdrop}
      >
        <BottomSheetView className="px-5" style={{ paddingBottom: 32 + insets.bottom }}>
          <Typography variant="h6" className="mb-1">
            {t("title")}
          </Typography>

          <Typography variant="span" color="secondary" className="mb-4">
            {t("description")}
          </Typography>

          <Input
            className="mb-5"
            label={t("urlLabel")}
            placeholder={t("urlPlaceholder")}
            placeholderTextColor="rgba(0,0,0,0.25)"
            value={url}
            onChangeText={(value) => {
              setUrl(value);
              setError(false);
            }}
            status={error ? "error" : "none"}
            helperText={error ? t("invalidUrl") : undefined}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
          />

          <View className="flex-row gap-2">
            <Button variant="outline" size={48} className="flex-1" onPress={handleReset}>
              {t("reset")}
            </Button>

            <Button size={48} className="flex-1" onPress={handleSave}>
              {t("save")}
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

ServerSettingsSheet.displayName = "ServerSettingsSheet";

export { ServerSettingsSheet };
