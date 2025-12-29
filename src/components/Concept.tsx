import React, { useState } from 'react';
import { ArchitecturalCanvas } from './ArchitecturalCanvas';
import { VizState } from '../types';

export const Concept: React.FC = () => {
  const [mode, setMode] = useState<VizState>(VizState.SCHEMATIC);

  const toggleMode = () => {
    setMode(prev => prev === VizState.SCHEMATIC ? VizState.VOLUMETRIC : VizState.SCHEMATIC);
  };

  return (
    <section id="concept" className="py-24 md:py-32 lg:py-48 bg-gradient-to-br from-[#f8f8f8] via-[#f5f5f5] to-[#f0f0f0] text-[#1a1a1a] overflow-hidden relative">
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="px-6 md:px-12 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-5 space-y-8 lg:space-y-12">
            
            {/* Header Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-[1px] bg-gradient-to-r from-black/60 to-transparent" />
                <span className="text-[9px] uppercase tracking-[0.5em] font-mono opacity-40">
                  Interactive Studio / 01
                </span>
              </div>
              
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
                Explore the <br />
                <span className="italic opacity-60 bg-gradient-to-r from-black to-black/50 bg-clip-text text-transparent">
                  Digital Twin
                </span>
              </h2>
              
              <div className="w-16 h-1 bg-black/10 rounded-full" />
            </div>
            
            {/* Description */}
            <p className="text-base md:text-lg font-light opacity-70 leading-relaxed max-w-lg">
              A house is not just a plan—it is a volume to be navigated, experienced, and understood. 
              Our visualization tool allows you to transition seamlessly between technical wireframes 
              and full volumetric renders while exploring every angle in real-time.
            </p>

            {/* Mode Toggle Section */}
            <div className="pt-4 space-y-8">
              
              {/* Toggle Control */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">
                    Render Mode
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      mode === VizState.SCHEMATIC ? 'bg-blue-500' : 'bg-black/20'
                    }`} />
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      mode === VizState.VOLUMETRIC ? 'bg-emerald-500' : 'bg-black/20'
                    }`} />
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={toggleMode}
                    className="relative w-24 h-12 bg-gradient-to-br from-black/5 to-black/10 rounded-full p-1.5 transition-all duration-500 hover:from-black/10 hover:to-black/15 focus:outline-none focus:ring-2 focus:ring-black/20 group shadow-inner"
                    aria-label="Toggle render mode"
                  >
                    <div className={`absolute top-1.5 left-1.5 w-9 h-9 bg-white rounded-full shadow-lg transition-all duration-500 flex items-center justify-center ${
                      mode === VizState.VOLUMETRIC ? 'translate-x-12' : 'translate-x-0'
                    }`}>
                      <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        mode === VizState.VOLUMETRIC 
                          ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' 
                          : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                      }`} />
                    </div>
                  </button>
                  
                  <div className="flex flex-col">
                    <span className="text-sm font-mono uppercase tracking-[0.15em] font-semibold">
                      {mode === VizState.SCHEMATIC ? 'Schematic' : 'Volumetric'}
                    </span>
                    <span className="text-[9px] opacity-40 uppercase tracking-wider font-mono">
                      Engine: Three.js R128
                    </span>
                  </div>
                </div>
              </div>

              {/* Controls Info Box */}
              <div className="relative group/info">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-lg blur-xl opacity-0 group-hover/info:opacity-100 transition-opacity duration-500" />
                <div className="relative p-5 border border-black/[0.08] rounded-lg bg-white/60 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 max-w-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-60">
                      Navigation
                    </h4>
                    <svg className="w-3 h-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <ul className="text-[10px] font-mono opacity-50 space-y-2 leading-relaxed">
                    <li className="flex items-start">
                      <span className="text-black/40 mr-2">→</span>
                      <span><strong className="font-semibold">Click + Drag</strong> to rotate model</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-black/40 mr-2">→</span>
                      <span><strong className="font-semibold">Scroll</strong> to zoom camera</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-black/40 mr-2">→</span>
                      <span><strong className="font-semibold">Right Click</strong> to pan position</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visualizer Container */}
          <div className="lg:col-span-7 relative">
            
            {/* Main Canvas Container */}
            <div className="relative aspect-[4/5] md:aspect-[5/6] lg:aspect-square bg-white shadow-[0_20px_100px_-20px_rgba(0,0,0,0.12)] rounded-lg overflow-hidden border border-black/[0.06] group/canvas">
              
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 group-hover/canvas:from-blue-500/[0.02] group-hover/canvas:to-purple-500/[0.02] transition-all duration-700 pointer-events-none z-10" />
              
              <ArchitecturalCanvas mode={mode} />

              {/* Technical Specs Overlay */}
              <div className="absolute bottom-6 right-6 text-right pointer-events-none z-20">
                <div className="bg-white/70 backdrop-blur-md px-4 py-3 rounded-lg shadow-sm border border-black/5">
                  <div className="text-[9px] font-mono opacity-40 uppercase leading-relaxed space-y-0.5">
                    <div className="flex justify-end items-center space-x-2">
                      <span className="opacity-60">FOV</span>
                      <span className="font-semibold text-black/60">40.00°</span>
                    </div>
                    <div className="flex justify-end items-center space-x-2">
                      <span className="opacity-60">AA</span>
                      <span className="font-semibold text-black/60">16x MSAA</span>
                    </div>
                    <div className="flex justify-end items-center space-x-2">
                      <span className="opacity-60">Renderer</span>
                      <span className="font-semibold text-black/60">WebGL 2.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};