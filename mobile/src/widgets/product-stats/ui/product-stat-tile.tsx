import { View } from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { cn } from "@/shared/lib";
import { Typography } from "@/shared/ui/core/typography";

interface ProductStatTileProps {
  icon: LucideIcon;
  iconBgClassName: string;
  iconColor: string;
  valueClassName: string;
  label: string;
  value: number;
}

const ProductStatTile = ({
  icon: Icon,
  iconBgClassName,
  iconColor,
  valueClassName,
  label,
  value,
}: ProductStatTileProps) => (
  <View className="flex-1 gap-2 rounded-2xl bg-card p-3">
    <View
      className={cn(
        "size-7 items-center justify-center rounded-lg",
        iconBgClassName,
      )}
    >
      <Icon size={15} color={iconColor} />
    </View>

    <Typography variant="h5" className={valueClassName}>
      {value}
    </Typography>

    <Typography variant="caption" color="secondary" numberOfLines={1}>
      {label}
    </Typography>
  </View>
);

export { ProductStatTile };
