import type { DefaultNamespace, Namespace, ParseKeys } from "i18next";
import type common from "./tr/common.json";
import type auth from "./tr/auth.json";
import type products from "./tr/products.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof common;
      auth: typeof auth;
      products: typeof products;
    };
  }
}

export type TranslationKey<Ns extends Namespace = DefaultNamespace> = ParseKeys<Ns>;
