
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../locales';

export const Philosophy: React.FC = () => {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <section id="philosophy" className="py-32 md:py-64 px-6 md:px-12 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-1 hidden md:block">
             <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 origin-top-left rotate-90 inline-block whitespace-nowrap">
               {t.philosophy.label}
             </span>
          </div>
          
          <div className="md:col-span-7">
            <h2 className="font-serif text-5xl md:text-8xl leading-[1.1] mb-16 reveal">
              {t.philosophy.title_prefix} <span className="italic">{t.philosophy.title_italic}</span> {t.philosophy.title_suffix}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="space-y-8">
                <p className="text-lg md:text-xl font-light opacity-70 leading-relaxed">
                  {t.philosophy.content1}
                </p>
                <div className="w-12 h-px bg-white/20"></div>
                <p className="text-sm opacity-50 leading-relaxed">
                  {t.philosophy.content2}
                </p>
              </div>
              <div className="relative pt-12 md:pt-0">
                <img 
                  src="https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?auto=format&fit=crop&q=80&w=800" 
                  alt="Light study"
                  className="w-full aspect-[3/4] object-cover grayscale opacity-40"
                />
                <span className="absolute bottom-4 left-4 text-[9px] uppercase tracking-widest opacity-30">{t.philosophy.imageCaption}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 md:pl-12 reveal" style={{ transitionDelay: '0.4s' }}>
            <div className="border-l border-white/10 pl-8 space-y-12">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-medium mb-4 opacity-40 italic">{t.philosophy.sections.honesty.title}</h4>
                <p className="text-sm opacity-60">{t.philosophy.sections.honesty.desc}</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-medium mb-4 opacity-40 italic">{t.philosophy.sections.rhythms.title}</h4>
                <p className="text-sm opacity-60">{t.philosophy.sections.rhythms.desc}</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-medium mb-4 opacity-40 italic">{t.philosophy.sections.sensitivity.title}</h4>
                <p className="text-sm opacity-60">{t.philosophy.sections.sensitivity.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
