import { useAuthStore } from "@/shared/store";
import i18n from "../i18n/config";
import { toast } from "./toast";

const handleSessionExpired = async () => {
  await i18n.loadNamespaces("auth");
  toast.error(i18n.t("sessionExpired", { ns: "auth" }));
  useAuthStore.getState().logout();
};

export { handleSessionExpired };
