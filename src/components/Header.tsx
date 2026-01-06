
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../locales';
import { LanguageSwitcher } from './LanguageSwitcher';



export const Header: React.FC = () => {
  const { locale } = useLanguage();
  const t = translations[locale];
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 px-6 md:px-12 py-6 flex items-center justify-between ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent'}`}>
      <div className="flex items-center space-x-2">
        <img src="/images/logo.svg" alt="Logo" className="h-9 md:h-9 w-auto" />
        
      </div>

      <div className="hidden md:flex items-center space-x-12">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              const element = document.getElementById(item.id);
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[12px] uppercase tracking-[0.2em] font-medium opacity-60 hover:opacity-100 transition-opacity"
          >
            {t.nav[item.id as keyof typeof t.nav]}
          </button>
        ))}
        <div className="w-px h-4 bg-white/20 mx-4"></div>
        <LanguageSwitcher />
      </div>

      <button 
        className="md:hidden flex flex-col space-y-1.5"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <span className="w-6 h-px bg-white"></span>
        <span className="w-6 h-px bg-white"></span>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-50 transition-transform duration-700 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} p-12 flex flex-col justify-center`}>
         <button 
          className="absolute top-8 right-8 text-white uppercase tracking-widest text-xs"
          onClick={() => setMobileMenuOpen(false)}
        >
          Close
        </button>
        <div className="flex flex-col space-y-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className="font-serif text-5xl hover:italic transition-all text-left"
              onClick={() => {
                setMobileMenuOpen(false);
                const element = document.getElementById(item.id);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t.nav[item.id as keyof typeof t.nav]}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
