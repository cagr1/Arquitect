
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../locales';

export const Footer: React.FC = () => {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <footer id="contact" className="bg-[#0a0a0a] pt-32 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-32 gap-12">
          <div className="max-w-2xl">
            <h2 className="font-serif text-5xl md:text-9xl leading-[0.8] mb-12">
              {t.footer.title_prefix} <br />
              <span className="italic">{t.footer.title_italic}</span> {t.footer.title_suffix}
            </h2>
            <div className="flex flex-col space-y-4">
              <a href="mailto:studio@aether.arch" className="text-xl md:text-3xl hover:italic transition-all border-b border-white/10 w-fit pb-1">
                bryanalezu@gmail.com
              </a>
              <p className="text-xs uppercase tracking-widest opacity-40">{t.footer.locations}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-24 gap-y-12">
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-40 mb-6">{t.footer.social}</p>
              <ul className="space-y-3">
                <li><a href="https://www.instagram.com/barz_architecture/" className="text-xs uppercase tracking-widest hover:opacity-60 transition-opacity">Instagram</a></li>
                <li><a href="#" className="text-xs uppercase tracking-widest hover:opacity-60 transition-opacity">LinkedIn</a></li>
                <li><a href="https://www.facebook.com/share/17bnoU3sb9/" className="text-xs uppercase tracking-widest hover:opacity-60 transition-opacity">Facebook</a></li>
                <li><a href="https://wa.me/593979071597" className="text-xs uppercase tracking-widest hover:opacity-60 transition-opacity">Whatsapp</a></li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-40 mb-6">{t.footer.explore.title}</p>
              <ul className="space-y-3">
                <li><a href="#" className="text-xs uppercase tracking-widest hover:opacity-60 transition-opacity">{t.footer.explore.journal}</a></li>
                <li><a href="#" className="text-xs uppercase tracking-widest hover:opacity-60 transition-opacity">{t.footer.explore.careers}</a></li>
                <li><a href="#" className="text-xs uppercase tracking-widest hover:opacity-60 transition-opacity">{t.footer.explore.awards}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <img src="/images/logo.svg" alt="Logo" className="h-9 md:h-9 w-auto" />
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-30 text-center md:text-left">
            {t.footer.copyright}
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-30 text-center md:text-left">
            {t.footer.copyright2}
          </p> 
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity flex items-center space-x-2"
          >
            <span>{t.footer.backToTop}</span>
            <svg className="w-3 h-3 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};
