import { Screen } from "@/shared/ui/custom/screen";
import { ProductStats } from "@/widgets/product-stats";
import { ProductList } from "@/features/products/product-list";

export default function ProductsScreen() {
  return (
    <Screen className="bg-wash" edges={["bottom"]}>
      <ProductStats />
      <ProductList />
    </Screen>
  );
}
