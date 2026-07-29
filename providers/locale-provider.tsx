"use client";

import { createContext, useContext, useCallback } from "react";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

type LocaleContextValue = {
  locale: Locale;
  switchLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: defaultLocale,
  switchLocale: () => {},
});

export function useLocale() {
  return useContext(LocaleContext);
}

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const switchLocale = useCallback((l: Locale) => {
    document.cookie = `locale=${l};path=/;max-age=31536000`;
    window.location.reload();
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, switchLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
