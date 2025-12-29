import { createContext, useContext } from 'react';
import type { Locale } from '../types';

export interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const LanguageContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
} | null>(null);


export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside LanguageContext.Provider');
  }
  return ctx;
};
