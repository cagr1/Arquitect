import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../locales';

export const Studio: React.FC = () => {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <section id="studio" className="py-32 md:py-48 px-6 md:px-12 bg-white text-black">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
        {/* Image Side */}
        <div className="relative aspect-[3/4] md:aspect-square overflow-hidden reveal">
            <img 
              src="/images/Image3.jpeg" 
              alt="Studio Atmosphere" 
              loading="lazy"
              className="w-full h-full object-cover grayscale opacity-90 hover:scale-105 transition-transform duration-[1.5s]"
            />
        </div>

        {/* Text Side */}
        <div className="flex flex-col justify-center reveal" style={{ transitionDelay: '0.2s' }}>
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-8 block">
            {t.studio.label}
          </span>
          <h2 className="font-serif text-5xl md:text-7xl leading-none mb-12">
            {t.studio.title}
          </h2>
          <div className="space-y-8 text-lg md:text-xl font-light leading-relaxed text-gray-600">
            <p>{t.studio.p1}</p>
            <p>{t.studio.p2}</p>
          </div>
          
          
        </div>
      </div>
    </section>
  );
};
