import { useState } from "react";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useUpdateStock, type Product } from "@/entities/products";
import { toast } from "@/shared/lib";

export const useStockUpdateForm = (product: Product) => {
  const { t } = useTranslation("products");

  const [stock, setStock] = useState<number>(product.stock ?? 0);
  const { updateStock, isPending } = useUpdateStock(product.id ?? 0);

  const increment = () => setStock((value) => value + 1);
  const decrement = () => setStock((value) => Math.max(0, value - 1));

  const setStockValue = (text: string) => {
    const parsed = +text.replace(/[^0-9]/g, "");
    setStock(Number.isNaN(parsed) ? 0 : parsed);
  };

  const isUnchanged = stock === (product.stock ?? 0);

  const handleSave = async () => {
    const updated = await updateStock(stock);

    if (updated) {
      toast.success(
        t("stockUpdate.success", { name: updated.name, stock: updated.stock }),
      );
      router.back();
    }
  };

  return {
    stock,
    isUnchanged,
    isPending,
    increment,
    decrement,
    setStockValue,
    handleSave,
  };
};
