import { View, TextInput } from "react-native";
import { Minus, Plus } from "lucide-react-native";
import { useTranslation } from "react-i18next";

import { Typography } from "@/shared/ui/core/typography";
import { Button } from "@/shared/ui/core/button";

import type { Product } from "@/entities/products";

import { useStockUpdateForm } from "./lib/use-stock-update-form";
import { StockStepperButton } from "./ui/stock-stepper-button";

interface StockUpdateFormProps {
  product: Product;
}

const StockUpdateForm = ({ product }: StockUpdateFormProps) => {
  const { t } = useTranslation("products");
  const { stock, increment, decrement, setStockValue, isUnchanged, isPending, handleSave } =
    useStockUpdateForm(product);

  return (
    <View className="flex-1 gap-6 px-4 py-4">
      <View className="items-center gap-1 rounded-2xl bg-card p-4">
        <Typography variant="span" className="font-medium text-ink">
          {product.name}
        </Typography>
        
        <Typography variant="caption" color="tertiary">
          {t("stockUpdate.currentStock")}: {product.stock ?? 0}
        </Typography>
      </View>

      <View className="flex-1 items-center justify-center gap-6">
        <Typography variant="span" color="secondary">
          {t("stockUpdate.newStock")}
        </Typography>

        <View className="flex-row items-center gap-5">
          <StockStepperButton icon={Minus} onPress={decrement} disabled={stock <= 0} />

          <TextInput
            value={String(stock)}
            onChangeText={setStockValue}
            keyboardType="number-pad"
            className="w-28 text-center text-4xl font-bold text-ink"
          />

          <StockStepperButton icon={Plus} onPress={increment} />
        </View>

        <Typography variant="caption" color="tertiary" className="text-center">
          {t("stockUpdate.reasonHint")}
        </Typography>
      </View>

      <Button onPress={handleSave} loading={isPending} disabled={isPending || isUnchanged} size={48}>
        {t("stockUpdate.save")}
      </Button>
    </View>
  );
};

export { StockUpdateForm };
