import { Pressable } from "react-native";
import { Check } from "lucide-react-native";
import { cn } from "@/shared/lib";
import { Typography } from "@/shared/ui/core/typography";

interface ProductFilterChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const ProductFilterChip = ({
  label,
  selected,
  onPress,
}: ProductFilterChipProps) => (
  <Pressable
    onPress={onPress}
    className={cn(
      "flex-row items-center gap-1.5 rounded-full border px-3.5 py-2",
      {
        "border-brand-500 bg-brand-500": selected,
        "border-outline bg-transparent": !selected,
      },
    )}
  >
    {selected && <Check size={14} color="#ffffff" />}

    <Typography
      variant="span"
      className={cn({
        "text-white": selected,
        "text-ink": !selected,
      })}
    >
      {label}
    </Typography>
  </Pressable>
);

export { ProductFilterChip };
