import type { ReactNode } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { formatDateTime, formatPrice } from "@/shared/lib";
import { Typography } from "@/shared/ui/core/typography";
import { Button } from "@/shared/ui/core/button";
import { ImagePreview } from "@/shared/ui/custom/image-preview";
import { StatusBadge } from "@/shared/ui/custom/status-badge";

import type { Product } from "@/entities/products";

import { useProductStatus } from "../lib/use-product-status";
import { useProductUnit } from "../lib/use-product-unit";

import { ProductInfoRow } from "./ui/product-info-row";

interface ProductViewProps {
  product: Product;
  onUpdateStock: () => void;
}

const ProductView = ({ product, onUpdateStock }: ProductViewProps) => {
  const { t, i18n } = useTranslation("products");

  const status = useProductStatus(product.status);
  const unitLabel = useProductUnit(product.unit);

  const rows: { label: string; value: ReactNode }[] = [
    { label: t("detail.sku"), value: product.sku ?? "—" },
    { label: t("detail.barcode"), value: product.barcode || "—" },
    { label: t("detail.category"), value: product.categoryName || "—" },
    { label: t("detail.brand"), value: product.brandName || "—" },
    { label: t("detail.price"), value: formatPrice(product.price ?? 0) },
    { label: t("detail.stock"), value: `${product.stock ?? 0} ${unitLabel}` },
    {
      label: t("detail.minStock"),
      value: `${product.minStock ?? 0} ${unitLabel}`,
    },
    {
      label: t("detail.updatedAt"),
      value: product.updatedAt
        ? formatDateTime(i18n.language, product.updatedAt)
        : "—",
    },
  ];

  return (
    <View className="gap-4 px-4 py-4">
      <ImagePreview src={product.imageUrl} className="h-56 w-full" />

      <View className="gap-1 rounded-2xl bg-card p-4">
        <View className="flex-row items-center gap-2">
          <Typography variant="h5" className="flex-1">
            {product.name}
          </Typography>

          <StatusBadge variant={status.variant} label={status.label} />
        </View>

        <Typography variant="span" color="secondary">
          {t("detail.sku")}: {product.sku}
        </Typography>
      </View>

      <View className="rounded-2xl bg-card p-4">
        {rows.map((row, index) => (
          <ProductInfoRow
            key={row.label}
            label={row.label}
            value={row.value}
            isLast={index === rows.length - 1}
          />
        ))}
      </View>

      <View className="rounded-2xl bg-card p-4">
        <Typography variant="h6" className="mb-2">
          {t("detail.description")}
        </Typography>

        <Typography variant="p" color="secondary">
          {product.description || t("detail.noDescription")}
        </Typography>
      </View>

      <Button onPress={onUpdateStock} size={48} className="mt-2">
        {t("detail.updateStock")}
      </Button>
    </View>
  );
};

export { ProductView };
