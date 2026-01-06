import { useState, useEffect, Suspense, lazy } from 'react'
import { Header } from "./components/Header";
import {Hero} from "./components/Hero";
// Lazy load heavy 3D component
const ArchitecturalVisualizer = lazy(() => import("./components/ArchitecturalVisualizer"));
import {Studio} from "./components/Studio";
import {Philosophy} from "./components/Philosophy";
import {Projects} from "./components/Projects";
import {Footer} from "./components/Footer";
import type { Locale } from './types';
import { LanguageContext } from './context/LanguageContext';
import { translations } from './locales';
import './App.css'


const App: React.FC = () => {
const [locale, setLocale] = useState<Locale>('en');
const t = translations[locale];

  useEffect(() => {
    
    
    // Reveal animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -10px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
    <main className="relative bg-black text-white selection:bg-white selection:text-black">
      <Header />
      <Hero />
      
      <Philosophy />
      
      <Suspense fallback={
        <div className="h-[50vh] w-full flex items-center justify-center bg-gray-50">
          <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-full animate-spin"></div>
        </div>
      }>
        <ArchitecturalVisualizer />
      </Suspense>
      
      <Studio />
      
      
      <Projects />

      {/* Large visual divider */}
      <div className="bg-[#0a0a0a] overflow-hidden whitespace-nowrap py-24 border-y border-white/5">
        <div className="animate-[marquee_80s_linear_infinite] inline-block">
          <span className="font-serif text-[15vw] leading-none uppercase tracking-tighter opacity-5 mr-12">{t.largeDivider.title}</span>
          <span className="font-serif text-[15vw] leading-none uppercase tracking-tighter opacity-5 mr-12">{t.largeDivider.subtitle}</span>
          <span className="font-serif text-[15vw] leading-none uppercase tracking-tighter opacity-5 mr-12">{t.largeDivider.paragraph}</span>
          
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-active {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
    </LanguageContext.Provider>
  );
};

export default App
