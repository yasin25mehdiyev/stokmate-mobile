import type { ReactNode } from "react";
import { View } from "react-native";
import { cn } from "@/shared/lib";
import { Typography } from "@/shared/ui/core/typography";

interface ProductInfoRowProps {
  label: string;
  value: ReactNode;
  isLast?: boolean;
}

const ProductInfoRow = ({ label, value, isLast }: ProductInfoRowProps) => (
  <View
    className={cn("flex-row items-center justify-between gap-4 py-3", {
      "border-b border-wash": !isLast,
    })}
  >
    <Typography variant="span" color="secondary">
      {label}
    </Typography>
    {typeof value === "string" || typeof value === "number" ? (
      <Typography
        variant="span"
        className="flex-1 text-right font-medium text-ink"
      >
        {value}
      </Typography>
    ) : (
      value
    )}
  </View>
);

export { ProductInfoRow };
