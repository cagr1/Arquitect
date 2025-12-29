
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505] px-6 md:px-12">
      {/* Background Grid Pattern - Subtle */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-screen-2xl h-full grid grid-cols-1 md:grid-cols-12 items-center">
        {/* Left Side: Typography */}
        <div className="md:col-span-7 flex flex-col justify-center h-full pt-20 md:pt-0">
          <div className="overflow-hidden mb-8">
            <span className="inline-block text-[10px] uppercase tracking-[0.6em] opacity-30 animate-[reveal-up_1s_cubic-bezier(0.16,1,0.3,1)_forwards]">
              Monograph No. 04 / Æther
            </span>
          </div>

          <h1 className="font-serif text-[clamp(3.5rem,10vw,12rem)] leading-[0.85] tracking-tighter mb-12">
            <div className="overflow-hidden">
              <span className="block animate-[reveal-up_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                Spatial /
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="block italic animate-[reveal-up_1.4s_cubic-bezier(0.16,1,0.3,1)_0.1s_forwards] pl-[0.1em]">
                Logic.
              </span>
            </div>
          </h1>

          <div className="max-w-md overflow-hidden">
            <div className="animate-[reveal-up_1.6s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards] opacity-40">
              <p className="text-sm md:text-lg font-light leading-relaxed mb-6">
                Redefining the relationship between volume and void through a lens of absolute structural necessity.
              </p>
              <p className="text-[10px] uppercase tracking-widest leading-loose">
                Berlin &mdash; Tokyo <br />
                International Practice
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Abstract Visual */}
        <div className="md:col-span-5 relative h-[50vh] md:h-screen overflow-hidden mt-8 md:mt-0">
          <div className="absolute inset-0 bg-[#0a0a0a] z-20 animate-[wipe-right_1.8s_cubic-bezier(0.77,0,0.175,1)_forwards]"></div>
          <div className="w-full h-full scale-110 animate-[slow-zoom-in_3s_cubic-bezier(0.16,1,0.3,1)_forwards]">
            <img 
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=2400" 
              alt="Conceptual architectural geometry"
              className="w-full h-full object-cover grayscale opacity-60 contrast-125"
            />
          </div>
          
          {/* Subtle Technical Annotation */}
          <div className="absolute bottom-12 right-0 z-30 opacity-20 hidden md:block">
            <div className="rotate-90 origin-right text-[9px] font-mono tracking-[0.4em] uppercase whitespace-nowrap">
              Study Ref: Geometry_0192.3_B
            </div>
          </div>
        </div>
      </div>

      {/* Side Progress Indicator */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col space-y-4 opacity-10">
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
