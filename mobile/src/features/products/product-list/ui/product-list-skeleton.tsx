import { View } from "react-native";
import { Skeleton } from "@/shared/ui/core/skeleton";

const ProductToolbarSkeleton = () => (
  <View className="flex-row items-center gap-2 px-4 pb-3">
    <View className="h-12 flex-1 flex-row items-center gap-2 rounded-full bg-card px-4">
      <Skeleton className="size-4 rounded-full" />
      <Skeleton className="h-3 flex-1 rounded" />
    </View>
    <View className="size-12 items-center justify-center rounded-full bg-card">
      <Skeleton className="size-5 rounded" />
    </View>
  </View>
);

const ProductListItemSkeleton = () => (
  <View className="mb-3 flex-row items-center gap-3 rounded-2xl bg-card p-3">
    <Skeleton className="size-14 rounded-xl" />
    <View className="flex-1 gap-2">
      <Skeleton className="h-4 w-3/4 rounded" />
      <Skeleton className="h-3 w-1/2 rounded" />
      <Skeleton className="h-4 w-1/3 rounded" />
    </View>
  </View>
);

const ProductListSkeleton = () => (
  <View className="flex-1">
    <ProductToolbarSkeleton />

    <View className="flex-1 px-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductListItemSkeleton key={index} />
      ))}
    </View>
  </View>
);

export { ProductListSkeleton };
