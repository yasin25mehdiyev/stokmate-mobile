import { useTranslation } from "react-i18next";
import { ProductUnit } from "@/entities/products";

export const useProductUnit = (unit: ProductUnit | undefined) => {
  const { t } = useTranslation("products");
  const resolvedUnit = unit ?? ProductUnit.NUMBER_1;

  return {
    [ProductUnit.NUMBER_1]: t("unit.piece"),
    [ProductUnit.NUMBER_2]: t("unit.kg"),
    [ProductUnit.NUMBER_3]: t("unit.liter"),
    [ProductUnit.NUMBER_4]: t("unit.box"),
  }[resolvedUnit];
};
