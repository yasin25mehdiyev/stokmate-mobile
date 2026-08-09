import { Pressable } from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { cn } from "@/shared/lib";

interface StockStepperButtonProps {
  icon: LucideIcon;
  onPress: () => void;
  disabled?: boolean;
}

const StockStepperButton = ({
  icon: Icon,
  onPress,
  disabled,
}: StockStepperButtonProps) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    className={cn(
      "size-14 items-center justify-center rounded-full border border-brand-100 bg-white active:bg-wash",
      {
        "border-disabled-border bg-disabled": disabled,
      },
    )}
  >
    <Icon size={24} color={disabled ? "rgba(0,0,0,0.38)" : "#225df0"} />
  </Pressable>
);

export { StockStepperButton };
