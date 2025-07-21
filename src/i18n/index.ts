import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
// import ja from "./locales/ja.json";
import es from "./locales/es.json";

const supportedLangs = ["en", "es"];
const fallbackLang = "en";

// Get language from localStorage or fallback
const getStoredLanguage = (): string => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("lang");
    return stored && supportedLangs.includes(stored) ? stored : fallbackLang;
  }
  return fallbackLang;
};

i18n.use(initReactI18next).init({
  lng: getStoredLanguage(), // Set initial language from localStorage
  fallbackLng: fallbackLang,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
});

// Save language changes to localStorage
i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("lang", lng);
  }
});

export default i18n;
