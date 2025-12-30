
import React from 'react';
import { PROJECTS } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../locales';

export const Projects: React.FC = () => {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <section id="work" className="py-32 md:py-64 bg-[#0a0a0a]">
      <div className="px-6 md:px-12 mb-24 md:mb-40 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="reveal">
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 block mb-6">{t.projects.label}</span>
          <h2 className="font-serif text-6xl md:text-9xl leading-[0.8]">{t.projects.title_prefix} <br /><span className="italic">{t.projects.title_suffix}</span></h2>
        </div>
        <div className="max-w-xs reveal" style={{ transitionDelay: '0.2s' }}>
          <p className="text-sm md:text-base font-light opacity-50 leading-relaxed mb-6">
            {t.projects.description}
          </p>
          <a href="#" className="text-[10px] uppercase tracking-widest border-b border-white/20 pb-1 hover:border-white transition-all">{t.projects.download}</a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-32 md:gap-y-64 px-6 md:px-12">
        {PROJECTS.map((project, idx) => {
          const isFullWidth = project.size === 'large';
          const isOdd = idx % 2 !== 0;
          
          return (
            <div 
              key={project.id} 
              className={`md:col-span-12 reveal ${isOdd && !isFullWidth ? 'md:flex md:justify-end' : ''}`}
            >
              <div className={`${isFullWidth ? 'w-full' : 'md:w-3/5'} group cursor-pointer relative`}>
                <div className="relative overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-neutral-900">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[2s] ease-out grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700"></div>
                </div>
                
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                   <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                   </div>
                </div>

                <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between space-y-4 md:space-y-0">
                  <div className="flex items-start space-x-6">
                    <span className="font-serif text-2xl md:text-3xl opacity-20">{project.id}</span>
                    <div>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <h3 className="font-serif text-3xl md:text-5xl group-hover:italic transition-all duration-500">{(t.projects as any)[project.key]?.title}</h3>
                      <div className="flex items-center space-x-4 mt-2">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        <p className="text-[10px] uppercase tracking-widest opacity-40">{(t.projects as any)[project.key]?.location}</p>
                        <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        <p className="text-[10px] uppercase tracking-widest opacity-40">{(t.projects as any)[project.key]?.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] uppercase tracking-widest opacity-40">
                    {t.projects.built} / {project.year}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-48 md:mt-80 flex flex-col items-center">
        <button className="group relative">
           <span className="font-serif text-4xl md:text-7xl transition-all duration-700 group-hover:italic group-hover:tracking-wider">{t.projects.explore}</span>
           <div className="mt-4 w-full h-px bg-white/10 overflow-hidden">
             <div className="w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
           </div>
        </button>
      </div>
    </section>
  );
};
