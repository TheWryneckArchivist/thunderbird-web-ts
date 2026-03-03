"use client";
import type { JSX } from "react";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, SUPPORTED_LANGUAGES } from "./constants";
import { getDictionary } from "./dictionary";
import { isLanguageCode } from "./guards";
import { AppDictionary, LanguageCode, LanguageOption } from "./types";

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  dictionary: AppDictionary;
  languageOptions: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readInitialLanguage(): LanguageCode {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return isLanguageCode(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [language, setLanguageState] = useState<LanguageCode>(readInitialLanguage);

  const setLanguage = (nextLanguage: LanguageCode): void => {
    setLanguageState(nextLanguage);
  };

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      dictionary: getDictionary(language),
      languageOptions: SUPPORTED_LANGUAGES,
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n(): LanguageContextValue {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useI18n must be used within LanguageProvider");
  }

  return context;
}
