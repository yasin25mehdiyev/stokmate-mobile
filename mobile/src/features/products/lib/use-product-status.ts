import { useTranslation } from "react-i18next";
import { ProductStatus } from "@/entities/products";

const STATUS_VARIANT = {
  [ProductStatus.NUMBER_1]: "success",
  [ProductStatus.NUMBER_2]: "neutral",
  [ProductStatus.NUMBER_3]: "error",
} as const;

export const useProductStatus = (status: ProductStatus | undefined) => {
  const { t } = useTranslation("products");
  const resolvedStatus = status ?? ProductStatus.NUMBER_1;

  const label = {
    [ProductStatus.NUMBER_1]: t("status.active"),
    [ProductStatus.NUMBER_2]: t("status.inactive"),
    [ProductStatus.NUMBER_3]: t("status.discontinued"),
  }[resolvedStatus];

  return { label, variant: STATUS_VARIANT[resolvedStatus] };
};
