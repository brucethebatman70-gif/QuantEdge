"use client";

import { useCallback } from "react";
import { locales, type Locale } from "@/lib/i18n/config";
import { Button } from "./ui/button";

export function LanguageSwitcher() {
  const switchLocale = useCallback((locale: Locale) => {
    document.cookie = `locale=${locale};path=/;max-age=31536000`;
    window.location.reload();
  }, []);

  return (
    <div className="flex gap-1">
      {locales.map((locale) => (
        <Button key={locale} variant="ghost" size="sm" onClick={() => switchLocale(locale)}>
          {locale.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
