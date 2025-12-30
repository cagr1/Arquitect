import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useLanguage();

  return (
    <button
      onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}
      className="text-xs uppercase tracking-widest hover:opacity-100 transition-opacity opacity-60 font-mono"
      aria-label="Switch language"
    >
      {locale === 'en' ? 'ES' : 'EN'}
    </button>
  );
};
