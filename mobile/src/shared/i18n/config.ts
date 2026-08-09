import i18n, { type LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

import trCommon from "./tr/common.json";
import trAuth from "./tr/auth.json";
import trProducts from "./tr/products.json";
import enCommon from "./en/common.json";
import enAuth from "./en/auth.json";
import enProducts from "./en/products.json";
import ruCommon from "./ru/common.json";
import ruAuth from "./ru/auth.json";
import ruProducts from "./ru/products.json";

export const defaultNS = "common";

const LANGUAGE_STORAGE_KEY = "stokmate_language";

// Cihazın dili dikkate alınmaz; yalnızca kullanıcının daha önce açıkça
// seçtiği dil (AsyncStorage) hatırlanır, aksi halde tr kullanılır.
const languageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: async (callback) => {
    const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    callback(stored ?? "tr");
  },
  cacheUserLanguage: async (language) => {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  },
};

void i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "tr",
    supportedLngs: ["tr", "en", "ru"],
    ns: ["common", "auth", "products"],
    defaultNS,
    resources: {
      tr: { common: trCommon, auth: trAuth, products: trProducts },
      en: { common: enCommon, auth: enAuth, products: enProducts },
      ru: { common: ruCommon, auth: ruAuth, products: ruProducts },
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
