'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, LOCALES, TranslationKey, translations } from '@/i18n/translations';

interface LanguageContextType {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LS_KEY = 'protemp_locale';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY) as Locale | null;
      if (saved && LOCALES.some((l) => l.code === saved)) {
        setLocaleState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const dir = LOCALES.find((l) => l.code === locale)?.dir ?? 'ltr';

  // Sync <html> attributes whenever locale changes
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('lang', locale);
    html.setAttribute('dir', dir);
  }, [locale, dir]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(LS_KEY, newLocale);
    } catch {
      // ignore
    }
  };

  const t = (key: TranslationKey): string => {
    return translations[locale][key] ?? translations['en'][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ locale, dir, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
