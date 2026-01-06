import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../locales';

export const Hero: React.FC = () => {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-[#050505]">
      {/* Background Grid Pattern - Subtle */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      {/* Right Side: Abstract Visual (Absolute Positioned) */}
      <div className="absolute top-0 right-0 w-full md:w-[50%] h-full overflow-hidden z-0">
         <div className="absolute inset-0 bg-[#0a0a0a] z-20 animate-[wipe-right_1.8s_cubic-bezier(0.77,0,0.175,1)_forwards]"></div>
         <div className="w-full h-full animate-[slow-zoom-in_3s_cubic-bezier(0.16,1,0.3,1)_forwards]">
            <img 
              src="/images/hero.jpeg" 
              alt="Conceptual architectural geometry"
              className="w-full h-full object-cover grayscale opacity-60 contrast-125"
            />
         </div>
      </div>

      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-12 w-full">
            {/* Left Side: Typography */}
            <div className="md:col-span-7 flex flex-col justify-center pt-20 md:pt-0">
            
              <h1 className="font-serif text-[clamp(3.5rem,9vw,12rem)] leading-[0.85] tracking-tighter mb-12">
                <div className="overflow-hidden pb-4 -mb-4">
                  <span className="block animate-[reveal-up_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                    {t.hero.title_line1}
                  </span>
                </div>
                <div className="overflow-hidden pb-4 -mb-4">
                  <span className="block italic animate-[reveal-up_1.4s_cubic-bezier(0.16,1,0.3,1)_0.1s_forwards] pl-[0.1em]">
                    {t.hero.title_line2}
                  </span>
                </div>
              </h1>

              <div className="max-w-md overflow-hidden">
                <div className="animate-[reveal-up_1.6s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards] opacity-40">
                  <p className="text-sm md:text-lg font-light leading-relaxed mb-6">
                    {t.hero.description}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest leading-loose whitespace-pre-line">
                    {t.hero.about}
                  </p>
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Side Progress Indicator - Adjusted z-index */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col space-y-4 opacity-10 z-20">
        <div className="w-px h-12 bg-white"></div>
        <div className="w-px h-12 bg-white/20"></div>
        <div className="w-px h-12 bg-white/20"></div>
      </div>

      <style>{`
        @keyframes reveal-up {
          from { transform: translateY(110%); }
          to { transform: translateY(0); }
        }
        @keyframes wipe-right {
          from { transform: translateX(0); }
          to { transform: translateX(101%); }
        }
        @keyframes slow-zoom-in {
          from { transform: scale(1.15); }
          to { transform: scale(1.0); }
        }
      `}</style>
    </section>
  );
};
