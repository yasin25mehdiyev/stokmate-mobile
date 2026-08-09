import { type ReactNode } from "react";
import { ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Screen } from "@/shared/ui/custom/screen";
import { EmptyState } from "@/shared/ui/custom/empty-state";
import { useProduct } from "@/entities/products";
import {
  ProductView,
  ProductViewSkeleton,
} from "@/features/products/product-view";

export default function ProductViewScreen() {
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
    content = (
      <ScrollView contentContainerClassName="pb-8">
        <ProductView
          product={product}
          onUpdateStock={() =>
            router.push({
              pathname: "/products/[id]/stock",
              params: { id: String(productId) },
            })
          }
        />
      </ScrollView>
    );
  }

  return (
    <Screen className="bg-wash" edges={["bottom"]}>
      {content}
    </Screen>
  );
}
