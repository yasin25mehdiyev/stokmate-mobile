import { View } from "react-native";
import { Skeleton } from "@/shared/ui/core/skeleton";

const ProductViewSkeleton = () => (
  <View className="gap-4 px-4 py-4">
    <Skeleton className="h-56 w-full rounded-2xl" />

    <View className="gap-2 rounded-2xl bg-card p-4">
      <Skeleton className="h-5 w-2/3 rounded" />
      <Skeleton className="h-4 w-1/3 rounded" />
    </View>

    <View className="gap-3 rounded-2xl bg-card p-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <View key={index} className="flex-row justify-between">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
        </View>
      ))}
    </View>
  </View>
);

export { ProductViewSkeleton };
