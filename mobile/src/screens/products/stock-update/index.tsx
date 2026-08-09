import { type ReactNode } from "react";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Screen } from "@/shared/ui/custom/screen";
import { EmptyState } from "@/shared/ui/custom/empty-state";
import { useProduct } from "@/entities/products";
import { ProductViewSkeleton } from "@/features/products/product-view";
import { StockUpdateForm } from "@/features/products/stock-update";

export default function StockUpdateScreen() {
  const { t } = useTranslation("products");
  const { id } = useLocalSearchParams<{ id: string }>();
  const productId = +id;

  const { product, isLoading, error, refetch } = useProduct(productId);

  let content: ReactNode;

  if (isLoading) {
    content = <ProductViewSkeleton />;
  } else if (error || !product) {
    content = (
      <EmptyState
        title={t("list.error")}
        actionLabel={t("list.retry")}
        onAction={() => refetch()}
      />
    );
  } else {
    content = <StockUpdateForm product={product} />;
  }

  return (
    <Screen className="bg-wash" edges={["bottom"]}>
      {content}
    </Screen>
  );
}
