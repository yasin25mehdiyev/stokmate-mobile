import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { FileQuestion } from "lucide-react-native";
import { Screen } from "@/shared/ui/custom/screen";
import { EmptyState } from "@/shared/ui/custom/empty-state";

export default function NotFoundScreen() {
  const { t } = useTranslation("common", { keyPrefix: "notFound" });

  return (
    <Screen>
      <EmptyState
        icon={<FileQuestion size={40} color="#a3a3a3" />}
        title={t("title")}
        description={t("description")}
        actionLabel={t("action")}
        onAction={() => router.replace("/")}
      />
    </Screen>
  );
}
