import { useCallback, useRef } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";

import { EmptyState } from "@/shared/ui/custom/empty-state";
import { ProductFilter } from "@/features/products/product-filter";

import { useProductList } from "./lib/use-product-list";

import { ProductToolbar } from "./ui/product-toolbar";
import { ProductListSkeleton } from "./ui/product-list-skeleton";
import { ProductListView } from "./ui/product-list-view";

const ProductList = () => {
  const { t } = useTranslation("products");
  const filterRef = useRef<BottomSheetModal>(null);

  const {
    search,
    setSearch,
    categoryId,
    setCategoryId,
    brandId,
    setBrandId,
    hasActiveFilters,
    clearFilters,
    products,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isPullRefreshing,
    handlePullRefresh,
  } = useProductList();

  const handleItemPress = useCallback((id: number) => {
    router.push({ pathname: "/products/[id]", params: { id: String(id) } });
  }, []);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <View className="flex-1">
      {!isLoading && (
        <ProductToolbar
          search={search}
          onSearchChange={setSearch}
          hasActiveFilters={hasActiveFilters}
          onOpenFilter={() => filterRef.current?.present()}
        />
      )}

      {isLoading ? (
        <ProductListSkeleton />
      ) : isError ? (
        <EmptyState
          title={t("list.error")}
          actionLabel={t("list.retry")}
          onAction={() => refetch()}
        />
      ) : (
        <ProductListView
          products={products}
          onItemPress={handleItemPress}
          isPullRefreshing={isPullRefreshing}
          onPullRefresh={handlePullRefresh}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onEndReached={handleEndReached}
        />
      )}

      <ProductFilter
        ref={filterRef}
        categoryId={categoryId}
        brandId={brandId}
        onCategoryChange={setCategoryId}
        onBrandChange={setBrandId}
        onClear={() => {
          clearFilters();
          filterRef.current?.dismiss();
        }}
      />
    </View>
  );
};

export { ProductList };
