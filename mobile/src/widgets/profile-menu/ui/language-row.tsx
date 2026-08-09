import { Pressable } from "react-native";
import { Check } from "lucide-react-native";
import { cn } from "@/shared/lib";
import { Typography } from "@/shared/ui/core/typography";

interface LanguageRowProps {
  flag: string;
  label: string;
  selected: boolean;
  onPress: () => void;
}

const LanguageRow = ({ flag, label, selected, onPress }: LanguageRowProps) => (
  <Pressable
    onPress={onPress}
    className={cn("flex-row items-center gap-3 rounded-xl px-3 py-3", {
      "bg-white": selected,
    })}
  >
    <Typography variant="span">{flag}</Typography>

    <Typography
      variant="span"
      className={cn("flex-1 text-ink", {
        "font-medium": selected,
      })}
    >
      {label}
    </Typography>

    {selected && <Check size={18} color="#225df0" />}
  </Pressable>
);

export { LanguageRow };
