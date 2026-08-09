import { Product } from "@/entities/products";
import { useTranslation } from "react-i18next";
import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { ProductListItem } from "./product-list-item";
import { EmptyState } from "@/shared/ui/custom/empty-state";
import { PackageSearch } from "lucide-react-native";

interface ProductListViewProps {
  products: Product[];
  onItemPress: (id: number) => void;
  isPullRefreshing: boolean;
  onPullRefresh: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onEndReached: () => void;
}

const ProductListView = ({
  products,
  onItemPress,
  isPullRefreshing,
  onPullRefresh,
  isFetchingNextPage,
  onEndReached,
}: ProductListViewProps) => {
  const { t } = useTranslation("products");

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => String(item.id)}
      contentContainerClassName="px-4 pb-6 grow"
      renderItem={({ item }) => (
        <ProductListItem product={item} onPress={onItemPress} />
      )}
      refreshControl={
        <RefreshControl
          refreshing={isPullRefreshing}
          onRefresh={onPullRefresh}
          colors={["#225df0"]}
        />
      }
      onEndReachedThreshold={0.4}
      onEndReached={onEndReached}
      ListFooterComponent={
        isFetchingNextPage ? (
          <View className="py-4">
            <ActivityIndicator color="#225df0" />
          </View>
        ) : null
      }
      ListEmptyComponent={
        <EmptyState
          icon={<PackageSearch size={40} color="#a3a3a3" />}
          title={t("list.empty")}
        />
      }
    />
  );
};

export { ProductListView };
