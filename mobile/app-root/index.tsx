import { Redirect } from "expo-router";
import { useAuthStore } from "@/shared/store";

export default function IndexRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return <Redirect href={isAuthenticated ? "/products" : "/login"} />;
}
