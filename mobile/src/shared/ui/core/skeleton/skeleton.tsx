import { View, type ViewProps } from "react-native";
import { cn } from "@/shared/lib";

const Skeleton = ({ className, ...props }: ViewProps) => {
  return (
    <View className={cn("animate-pulse rounded-md bg-wash", className)} {...props} />
  );
};

export { Skeleton };
