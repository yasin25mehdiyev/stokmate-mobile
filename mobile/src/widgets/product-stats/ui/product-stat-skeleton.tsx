import { View } from "react-native";
import { Skeleton } from "@/shared/ui/core/skeleton";

const ProductStatCardSkeleton = () => (
  <View className="flex-1 gap-2 rounded-2xl bg-card p-3">
    <Skeleton className="size-7 rounded-lg" />
    <Skeleton className="h-6 w-10 rounded" />
    <Skeleton className="h-3 w-16 rounded" />
  </View>
);

const ProductStatSkeleton = () => (
  <View className="flex-row gap-2 px-4 pb-3 pt-4">
    <ProductStatCardSkeleton />
    <ProductStatCardSkeleton />
    <ProductStatCardSkeleton />
  </View>
);

export { ProductStatSkeleton };
