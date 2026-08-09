import type { ReactNode } from "react";
import { View } from "react-native";
import { Typography } from "@/shared/ui/core/typography";
import { Button } from "@/shared/ui/core/button";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <View className="flex-1 items-center justify-center gap-3 px-8 py-12">
      {icon}
      <Typography variant="h6" color="primary" className="text-center">
        {title}
      </Typography>
      {description && (
        <Typography variant="span" color="secondary" className="text-center">
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button
          variant="outline"
          color="brand"
          size={36}
          onPress={onAction}
          className="mt-2"
        >
          {actionLabel}
        </Button>
      )}
    </View>
  );
};

export { EmptyState };
