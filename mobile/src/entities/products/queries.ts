import {
  keepPreviousData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getProducts,
  useGetProductsId,
  useGetProductsStats,
  usePatchProductsIdStock,
  getGetProductsIdQueryKey,
  getGetProductsStatsQueryKey,
} from "@/shared/api/generated/products/products";
import { PRODUCTS_PAGE_SIZE } from "@/shared/config/constants";
import { handleApiError } from "@/shared/lib";
import type { ProductListParams } from "./types";

const PRODUCTS_LIST_KEY_PREFIX = ["products", "list"] as const;

export const productsListKey = (params: ProductListParams) =>
  [...PRODUCTS_LIST_KEY_PREFIX, params] as const;

export const useProducts = (params: ProductListParams) => {
  const query = useInfiniteQuery({
    queryKey: productsListKey(params),
    queryFn: ({ pageParam, signal }) =>
      getProducts(
        {
          Q: params.q,
          CategoryId: params.categoryId,
          BrandId: params.brandId,
          Status: params.status,
          Page: pageParam,
          PageSize: PRODUCTS_PAGE_SIZE,
          Sort: params.sort,
          Dir: params.dir,
        },
        signal,
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const page = lastPage.page ?? 1;
      const pageSize = lastPage.pageSize ?? PRODUCTS_PAGE_SIZE;
      const total = lastPage.total ?? 0;
      return page * pageSize < total ? page + 1 : undefined;
    },
    placeholderData: keepPreviousData,
  });

  const products = query.data?.pages.flatMap((page) => page.items ?? []) ?? [];
  const total = query.data?.pages[0]?.total ?? 0;

  return { ...query, products, total };
};

export const useProductsStats = () => {
  const { data, isPending } = useGetProductsStats();

  return {
    total: data?.total ?? 0,
    lowStock: data?.lowStock ?? 0,
    outOfStock: data?.outOfStock ?? 0,
    isLoading: isPending,
  };
};

export const useProduct = (id: number) => {
  const { data, isPending, error, refetch } = useGetProductsId(id, {
    query: { enabled: !!id, retry: false },
  });

  return { product: data, isLoading: isPending, error, refetch };
};

export const useUpdateStock = (id: number) => {
  const invalidateProducts = useProductsInvalidateQueries();
  const { mutateAsync, isPending } = usePatchProductsIdStock();

  const updateStock = async (stock: number) => {
    try {
      const product = await mutateAsync({ id, data: { stock } });
      invalidateProducts(product.id);
      return product;
    } catch (error) {
      handleApiError(error);
      return null;
    }
  };

  return { updateStock, isPending };
};

export const useProductsInvalidateQueries = () => {
  const queryClient = useQueryClient();

  return (id?: number) => {
    queryClient.invalidateQueries({ queryKey: PRODUCTS_LIST_KEY_PREFIX });
    queryClient.invalidateQueries({ queryKey: getGetProductsStatsQueryKey() });

    if (id) {
      queryClient.invalidateQueries({ queryKey: getGetProductsIdQueryKey(id) });
    }
  };
};
