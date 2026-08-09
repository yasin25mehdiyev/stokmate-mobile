import { useTranslation } from "react-i18next";

type LanguageCode = "tr" | "en" | "ru";

interface Language {
  code: LanguageCode;
  label: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

const useLanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const currentLanguage =
    LANGUAGES.find((language) => language.code === i18n.language) ??
    LANGUAGES[0];

  const setLanguage = (code: LanguageCode) => {
    void i18n.changeLanguage(code);
  };

  return { languages: LANGUAGES, currentLanguage, setLanguage };
};

export { useLanguageSwitcher };
