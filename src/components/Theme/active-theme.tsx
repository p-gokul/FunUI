import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

const DEFAULT_THEME = "default";
const THEME_STORAGE_KEY = "selected-theme";

type ThemeContextType = {
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ActiveThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme?: string;
}) {
  const [activeTheme, setActiveThemeState] = useState<string>(() => {
    // Try localStorage first
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) return savedTheme;
    }
    return initialTheme || DEFAULT_THEME;
  });

  // Wrap state setter to also store in localStorage
  const setActiveTheme = (theme: string) => {
    setActiveThemeState(theme);
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  };

  useEffect(() => {
    // Update body classes
    Array.from(document.body.classList)
      .filter((className) => className.startsWith("theme-"))
      .forEach((className) => {
        document.body.classList.remove(className);
      });

    document.body.classList.add(`theme-${activeTheme}`);
    if (activeTheme.endsWith("-scaled")) {
      document.body.classList.add("theme-scaled");
    } else {
      document.body.classList.remove("theme-scaled");
    }
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeConfig() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeConfig must be used within an ActiveThemeProvider"
    );
  }
  return context;
}
