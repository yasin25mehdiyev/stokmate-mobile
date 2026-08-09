import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import ProductsScreen from "@/screens/products";
import { ProfileMenu } from "@/widgets/profile-menu";

export default function ProductsRoute() {
  const { t } = useTranslation("products");

  return (
    <>
      <Stack.Screen options={{ title: t("page.title"), headerRight: () => <ProfileMenu /> }} />
      <ProductsScreen />
    </>
  );
}
