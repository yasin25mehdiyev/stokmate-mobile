import { useState } from "react";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { useProducts } from "@/entities/products";

export const useProductList = () => {
  const [search, setSearch] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [brandId, setBrandId] = useState<number | undefined>();
  const [isPullRefreshing, setIsPullRefreshing] = useState<boolean>(false);

  const debouncedSearch = useDebounce(search, 400);

  const {
    products,
    total,
    isPending: isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useProducts({
    q: debouncedSearch || undefined,
    categoryId,
    brandId,
    sort: "updatedAt",
    dir: "desc",
  });

  const hasActiveFilters = !!categoryId || !!brandId;

  const clearFilters = () => {
    setCategoryId(undefined);
    setBrandId(undefined);
  };

  const handlePullRefresh = async () => {
    setIsPullRefreshing(true);
    await refetch();
    setIsPullRefreshing(false);
  };

  return {
    search,
    categoryId,
    brandId,
    hasActiveFilters,
    products,
    total,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    isPullRefreshing,
    setSearch,
    setCategoryId,
    setBrandId,
    clearFilters,
    fetchNextPage,
    refetch,
    handlePullRefresh,
  };
};
