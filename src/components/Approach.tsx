
import React from 'react';

const STEPS = [
  { id: '01', title: 'Conceptualization', description: 'Deep analysis of site, context, and the client’s ethereal needs.' },
  { id: '02', title: 'Material Honesty', description: 'Selecting elements that weather gracefully and tell a story over time.' },
  { id: '03', title: 'Refinement', description: 'Iterative reduction to find the core structural truth of the space.' },
  { id: '04', title: 'Curation', description: 'The final harmony of light, furniture, and environmental atmosphere.' },
];

export const Approach: React.FC = () => {
  return (
    <section id="process" className="py-32 md:py-64 bg-white text-black">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
          <div className="md:col-span-4">
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 block mb-6">03 / The Process</span>
            <h2 className="font-serif text-5xl md:text-8xl leading-none">How we <br /><span className="italic">Manifest</span></h2>
          </div>
          <div className="md:col-span-8 flex items-end">
            <p className="text-xl md:text-3xl font-light leading-relaxed max-w-xl opacity-70">
              Our process is a dialogue. Between architect and site, between vision and reality. We strip away the noise until only the structure remains.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {STEPS.map((step) => (
            <div key={step.id} className="group">
              <span className="font-serif text-4xl block mb-8 opacity-20 group-hover:opacity-100 transition-opacity">({step.id})</span>
              <h3 className="text-lg uppercase tracking-widest font-medium mb-4">{step.title}</h3>
              <p className="text-sm leading-relaxed opacity-60">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
