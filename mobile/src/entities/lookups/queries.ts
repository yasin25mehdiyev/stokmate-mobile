import { useGetCategories, useGetBrands } from "@/shared/api/generated/lookups/lookups";
import { STALE_TIME_MS } from "@/shared/config/constants";

export const useCategories = () => {
  const { data, isPending, error } = useGetCategories({
    query: { staleTime: STALE_TIME_MS },
  });

  return { categories: data ?? [], isLoading: isPending, error };
};

export const useBrands = () => {
  const { data, isPending, error } = useGetBrands({
    query: { staleTime: STALE_TIME_MS },
  });

  return { brands: data ?? [], isLoading: isPending, error };
};
