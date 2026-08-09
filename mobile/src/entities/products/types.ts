import type { ProductStatus } from "@/shared/api/generated/models/productStatus";

export type { ProductDto as Product } from "@/shared/api/generated/models/productDto";
export { ProductStatus } from "@/shared/api/generated/models/productStatus";
export { ProductUnit } from "@/shared/api/generated/models/productUnit";

export interface ProductListParams {
  q?: string;
  categoryId?: number;
  brandId?: number;
  status?: ProductStatus;
  sort?: "name" | "price" | "stock" | "updatedAt";
  dir?: "asc" | "desc";
}
