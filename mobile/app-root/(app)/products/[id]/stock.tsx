import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import StockUpdateScreen from "@/screens/products/stock-update";

export default function StockUpdateRoute() {
  const { t } = useTranslation("products");

  return (
    <>
      <Stack.Screen options={{ title: t("stockUpdate.title"), presentation: "modal" }} />
      <StockUpdateScreen />
    </>
  );
}
