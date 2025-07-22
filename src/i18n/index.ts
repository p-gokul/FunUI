import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import es from "./locales/es.json";
import jp from "./locales/jp.json";
import de from "./locales/de.json";
import fr from "./locales/fr.json";
import hi from "./locales/hi.json";

const supportedLangs = ["en", "es", "jp", "de", "fr", "hi"];
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
    jp: { translation: jp },
    de: { translation: de },
    fr: { translation: fr },
    hi: { translation: hi },
  },
});

// Save language changes to localStorage
i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("lang", lng);
  }
});

export default i18n;
