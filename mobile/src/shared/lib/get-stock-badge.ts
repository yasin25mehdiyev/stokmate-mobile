import { TFunction } from "i18next";

const getStockBadge = (
  stock: number,
  minStock: number,
  t: TFunction<"products">,
) => {
  if (stock === 0)
    return { variant: "error" as const, label: t("list.outOfStock") };

  if (stock <= minStock)
    return {
      variant: "warning" as const,
      label: `${stock} · ${t("list.lowStock")}`,
    };

  return null;
};

export { getStockBadge };
