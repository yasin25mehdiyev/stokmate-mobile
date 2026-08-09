import { memo } from "react";
import { Pressable, View, type ViewStyle } from "react-native";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react-native";
import { formatPrice, getStockBadge } from "@/shared/lib";
import { Typography } from "@/shared/ui/core/typography";
import { StatusBadge } from "@/shared/ui/custom/status-badge";
import { ImagePreview } from "@/shared/ui/custom/image-preview";
import type { Product } from "@/entities/products";
import { useProductStatus } from "@/features/products/lib/use-product-status";

const cardShadowStyle: ViewStyle = {
  shadowColor: "#000",
  shadowOpacity: 0.06,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  elevation: 1,
};

interface ProductListItemProps {
  product: Product;
  onPress: (id: number) => void;
}

const ProductListItemWrapper = ({ product, onPress }: ProductListItemProps) => {
  const { t } = useTranslation("products");
  const status = useProductStatus(product.status);

  const stock = product.stock ?? 0;
  const minStock = product.minStock ?? 0;

  const stockBadge = getStockBadge(stock, minStock, t);

  return (
    <Pressable
      onPress={() => onPress(product.id ?? 0)}
      className="mb-3 flex-row items-center gap-3 rounded-2xl bg-card p-3 active:opacity-80"
      style={cardShadowStyle}
    >
      <ImagePreview src={product.imageUrl} className="size-14" />

      <View className="flex-1 gap-1">
        <View className="flex-row items-center gap-2">
          <Typography
            variant="span"
            className="flex-1 font-medium text-ink"
            numberOfLines={1}
          >
            {product.name}
          </Typography>

          <StatusBadge variant={status.variant} label={status.label} />
        </View>

        <Typography variant="caption" color="secondary" numberOfLines={1}>
          {product.sku} · {product.categoryName ?? "—"}
        </Typography>

        <View className="mt-1 flex-row items-center justify-between">
          <Typography variant="span" className="font-medium text-ink">
            {formatPrice(product.price ?? 0)}
          </Typography>

          {stockBadge ? (
            <StatusBadge
              variant={stockBadge.variant}
              label={stockBadge.label}
            />
          ) : (
            <Typography variant="caption" color="secondary">
              {t("detail.stock")}: {stock}
            </Typography>
          )}
        </View>
      </View>

      <ChevronRight size={18} color="rgba(0,0,0,0.25)" />
    </Pressable>
  );
};

const ProductListItem = memo(ProductListItemWrapper);

export { ProductListItem };
