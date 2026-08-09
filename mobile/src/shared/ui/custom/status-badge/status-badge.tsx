import { View, Text, type ViewProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib";

const statusBadgeVariants = cva(
  "flex-row items-center self-start gap-1 rounded-full px-2.5 py-1",
  {
    variants: {
      variant: {
        success: "bg-success/10",
        warning: "bg-warning/10",
        error: "bg-negative-wash",
        neutral: "bg-wash",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

const textColorByVariant = {
  success: "text-success",
  warning: "text-warning",
  error: "text-negative-600",
  neutral: "text-ink-secondary",
} as const;

interface StatusBadgeProps
  extends ViewProps,
    VariantProps<typeof statusBadgeVariants> {
  label: string;
}

const StatusBadge = ({
  className,
  variant = "neutral",
  label,
  ...props
}: StatusBadgeProps) => {
  return (
    <View className={cn(statusBadgeVariants({ variant }), className)} {...props}>
      <Text
        className={cn(
          "text-xs leading-4 font-medium",
          textColorByVariant[variant ?? "neutral"],
        )}
      >
        {label}
      </Text>
    </View>
  );
};

export { StatusBadge, statusBadgeVariants };
