import { forwardRef } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";
import { Typography } from "@/shared/ui/core/typography";
import { Button } from "@/shared/ui/core/button";
import { SheetBackdrop } from "@/shared/ui/custom/bottom-sheet";
import { useCategories, useBrands } from "@/entities/lookups";
import { ProductFilterChip } from "./ui/product-filter-chip";

interface ProductFilterProps {
  categoryId?: number;
  brandId?: number;
  onCategoryChange: (id?: number) => void;
  onBrandChange: (id?: number) => void;
  onClear: () => void;
}

const ProductFilter = forwardRef<BottomSheetModal, ProductFilterProps>(
  ({ categoryId, brandId, onCategoryChange, onBrandChange, onClear }, ref) => {
    const { t } = useTranslation("products");

    const { categories } = useCategories();
    const { brands } = useBrands();

    const insets = useSafeAreaInsets();

    return (
      <BottomSheetModal
        ref={ref}
        enableDynamicSizing
        maxDynamicContentSize={560}
        backdropComponent={SheetBackdrop}
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-5"
          contentContainerStyle={{ paddingBottom: 32 + insets.bottom }}
        >
          <View className="mb-2 flex-row items-center justify-between">
            <Typography variant="h6">{t("filter.title")}</Typography>

            <Button variant="ghost" size={36} onPress={onClear}>
              {t("filter.clear")}
            </Button>
          </View>

          <Typography variant="span" color="secondary" className="mb-2">
            {t("detail.category")}
          </Typography>

          <View className="mb-5 flex-row flex-wrap gap-2">
            {categories.map((category) => (
              <ProductFilterChip
                key={category.id}
                label={category.name ?? ""}
                selected={categoryId === category.id}
                onPress={() =>
                  onCategoryChange(categoryId === category.id ? undefined : category.id)
                }
              />
            ))}
          </View>

          <Typography variant="span" color="secondary" className="mb-2">
            {t("detail.brand")}
          </Typography>

          <View className="flex-row flex-wrap gap-2">
            {brands.map((brand) => (
              <ProductFilterChip
                key={brand.id}
                label={brand.name ?? ""}
                selected={brandId === brand.id}
                onPress={() => onBrandChange(brandId === brand.id ? undefined : brand.id)}
              />
            ))}
          </View>
          
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  },
);

ProductFilter.displayName = "ProductFilter";

export { ProductFilter };
