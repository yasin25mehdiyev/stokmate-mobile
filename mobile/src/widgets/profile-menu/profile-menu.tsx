import { useRef } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";
import { CalendarDays, LogOut } from "lucide-react-native";

import { formatToday } from "@/shared/lib";
import { Typography } from "@/shared/ui/core/typography";
import { Button } from "@/shared/ui/core/button";
import { UserAvatar } from "@/shared/ui/custom/user-avatar";
import { SheetBackdrop } from "@/shared/ui/custom/bottom-sheet";

import { useGetCurrentUser } from "@/entities/profile";
import { useLogout } from "@/features/auth/logout";

import { useLanguageSwitcher } from "./lib/use-language-switcher";
import { ProfileMenuTrigger } from "./ui/profile-menu-trigger";
import { LanguageRow } from "./ui/language-row";

const ProfileMenu = () => {
  const { t, i18n } = useTranslation("common");
  const sheetRef = useRef<BottomSheetModal>(null);

  const { response: user } = useGetCurrentUser();
  const { handleLogout } = useLogout();

  const { languages, currentLanguage, setLanguage } = useLanguageSwitcher();
  const insets = useSafeAreaInsets();

  const today = formatToday(i18n.language);

  return (
    <>
      <ProfileMenuTrigger onPress={() => sheetRef.current?.present()} />

      <BottomSheetModal
        ref={sheetRef}
        enableDynamicSizing
        backdropComponent={SheetBackdrop}
      >
        <BottomSheetView
          className="px-5"
          style={{ paddingBottom: 32 + insets.bottom }}
        >
          <View className="mb-5 flex-row items-center gap-3">
            <UserAvatar imageUrl={user?.imageUrl} size={48} />

            <View className="min-w-0 flex-1">
              <Typography
                variant="span"
                className="font-medium text-ink"
                numberOfLines={1}
              >
                {user?.fullName}
              </Typography>

              <Typography variant="caption" color="secondary" numberOfLines={1}>
                {user?.email}
              </Typography>
            </View>

            <View className="shrink-0 flex-row items-center gap-1.5 rounded-full bg-wash px-3 py-1.5">
              <CalendarDays size={16} color="#002857" />

              <Typography variant="span" color="secondary-brand">
                {today}
              </Typography>
            </View>
          </View>

          <Typography variant="span" color="secondary" className="mb-2">
            {t("language.title")}
          </Typography>

          <View className="mb-5 gap-1 rounded-2xl bg-wash p-1">
            {languages.map((language) => (
              <LanguageRow
                key={language.code}
                flag={language.flag}
                label={language.label}
                selected={language.code === currentLanguage.code}
                onPress={() => setLanguage(language.code)}
              />
            ))}
          </View>

          <Button
            variant="outline"
            color="negative"
            size={48}
            onPress={handleLogout}
            startIcon={<LogOut size={18} color="#eb0b0b" />}
          >
            {t("actions.logout")}
          </Button>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export { ProfileMenu };
