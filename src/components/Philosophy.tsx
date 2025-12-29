
import React from 'react';

export const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-32 md:py-64 px-6 md:px-12 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-1 hidden md:block">
             <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 origin-top-left rotate-90 inline-block whitespace-nowrap">
               Our Ethos / 01
             </span>
          </div>
          
          <div className="md:col-span-7">
            <h2 className="font-serif text-5xl md:text-8xl leading-[1.1] mb-16 reveal">
              We design <span className="italic">silence</span> into every structure.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="space-y-8">
                <p className="text-lg md:text-xl font-light opacity-70 leading-relaxed">
                  The studio operates at the intersection of craftsmanship and digital precision. We believe that true luxury lies in the quality of light and the resonance of natural materials.
                </p>
                <div className="w-12 h-px bg-white/20"></div>
                <p className="text-sm opacity-50 leading-relaxed">
                  Since our inception, we have resisted the ephemeral trends of the industry, choosing instead to focus on the lasting emotional impact of the built environment.
                </p>
              </div>
              <div className="relative pt-12 md:pt-0">
                <img 
                  src="https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?auto=format&fit=crop&q=80&w=800" 
                  alt="Light study"
                  className="w-full aspect-[3/4] object-cover grayscale opacity-40"
                />
                <span className="absolute bottom-4 left-4 text-[9px] uppercase tracking-widest opacity-30">Light Study #042</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 md:pl-12 reveal" style={{ transitionDelay: '0.4s' }}>
            <div className="border-l border-white/10 pl-8 space-y-12">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-medium mb-4 opacity-40 italic">Structural Honesty</h4>
                <p className="text-sm opacity-60">Materials should behave as their nature dictates. Concrete supports, wood warms, glass reveals.</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-medium mb-4 opacity-40 italic">Spatial Rhythms</h4>
                <p className="text-sm opacity-60">Movement through space is a sequence of moments, carefully choreographed for discovery.</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-medium mb-4 opacity-40 italic">Contextual Sensitivity</h4>
                <p className="text-sm opacity-60">A building is not an island. It is a dialogue with the topography and the history of its site.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
