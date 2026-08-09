import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Search, SlidersHorizontal } from "lucide-react-native";

import { cn } from "@/shared/lib";
import { Input } from "@/shared/ui/core/input";
import { Button } from "@/shared/ui/core/button";

interface ProductToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  hasActiveFilters: boolean;
  onOpenFilter: () => void;
}

const ProductToolbar = ({
  search,
  onSearchChange,
  hasActiveFilters,
  onOpenFilter,
}: ProductToolbarProps) => {
  const { t } = useTranslation("products");

  return (
    <View className="flex-row items-center gap-2 px-4 pb-3">
      <Input
        value={search}
        onChangeText={onSearchChange}
        placeholder={t("search.placeholder")}
        startIcon={<Search size={18} color="rgba(0,0,0,0.38)" />}
        className="h-12 flex-1 rounded-full border-transparent bg-white shadow-sm"
      />

      <Button
        variant={hasActiveFilters ? "primary" : "ghost"}
        color="brand"
        size={48}
        iconOnly
        onPress={onOpenFilter}
        className={cn("rounded-full", { "bg-white shadow-sm": !hasActiveFilters })}
      >
        <SlidersHorizontal size={18} color={hasActiveFilters ? "#ffffff" : "#225df0"} />
      </Button>
    </View>
  );
};

export { ProductToolbar };
