import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import ProductViewScreen from "@/screens/products/view";

export default function ProductDetailRoute() {
  const { t } = useTranslation("products");

  return (
    <>
      <Stack.Screen options={{ title: t("detail.title") }} />
      <ProductViewScreen />
    </>
  );
}
