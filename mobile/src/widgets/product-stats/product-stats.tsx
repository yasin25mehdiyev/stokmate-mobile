import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Package, AlertTriangle, PackageX } from "lucide-react-native";

import { useProductsStats } from "@/entities/products";

import { ProductStatTile } from "./ui/product-stat-tile";
import { ProductStatSkeleton } from "./ui/product-stat-skeleton";

const ProductStats = () => {
  const { t } = useTranslation("products", { keyPrefix: "stats" });

  const { total, lowStock, outOfStock, isLoading } = useProductsStats();

  if (isLoading) {
    return <ProductStatSkeleton />;
  }

  return (
    <View className="flex-row gap-2 px-4 pb-3 pt-4">
      <ProductStatTile
        icon={Package}
        iconBgClassName="bg-wash"
        iconColor="rgba(0,0,0,0.6)"
        valueClassName="text-ink"
        label={t("total")}
        value={total}
      />

      <ProductStatTile
        icon={AlertTriangle}
        iconBgClassName="bg-warning/10"
        iconColor="#ee7000"
        valueClassName="text-warning"
        label={t("lowStock")}
        value={lowStock}
      />

      <ProductStatTile
        icon={PackageX}
        iconBgClassName="bg-negative-wash"
        iconColor="#eb0b0b"
        valueClassName="text-negative-600"
        label={t("outOfStock")}
        value={outOfStock}
      />
    </View>
  );
};

export { ProductStats };
