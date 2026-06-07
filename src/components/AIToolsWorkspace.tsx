import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Terminal, Cpu, CheckCircle2 } from 'lucide-react';

export default function AIToolsWorkspace({ id = 'workspace' }: { id?: string }) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate values for the 3D parallax tilt of the entire cluster
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to animate the tilt nicely
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 100 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { damping: 20, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative position from center (-0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id={id} className="py-24 md:py-32 bg-[#FAF9F6] text-[#121212] overflow-hidden w-full relative z-20">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        
        {/* Header Block with Google Sans style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              <span className="text-[11px] font-bold tracking-wider text-indigo-500 uppercase font-mono">
                {t("Next-Gen Tooling")}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 font-display uppercase">
              {t("My AI & Dev Arsenal")}
            </h2>
            <p className="text-sm md:text-base text-neutral-500 leading-relaxed font-normal mt-4 max-w-xl">
              {t("A high-fidelity preview of the core tools, cognitive engines, and environments orchestrating my daily design and programmatic workflows.")}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-neutral-450 bg-neutral-100 border border-neutral-200/50 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Hover & Drag elements
            </span>
          </div>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Detailed stats & list */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white border border-neutral-200/80 rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.015)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <h3 className="text-lg font-bold text-neutral-900 mb-6 font-display">
                {t("Direct Workspace Integration")}
              </h3>
              
              <div className="flex flex-col gap-5">
                {/* VS Code */}
                <div className="flex items-start gap-4">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-center shrink-0">
                    <Terminal className="w-4 h-4 text-blue-650 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-800">Visual Studio Code</h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      {t("Customized keyboard configurations, micro-extensions, and local compilers tuned for millisecond iteration cycles.")}
                    </p>
                  </div>
                </div>

                {/* ChatGPT */}
                <div className="flex items-start gap-4">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Cpu className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-800">ChatGPT / GPTs</h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      {t("Utilized for programmatic debugging, semantic analysis, custom code refactoring pipelines, and prompt frameworks.")}
                    </p>
                  </div>
                </div>

                {/* Google Gemini */}
                <div className="flex items-start gap-4">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-purple-50/50 border border-purple-100 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-800">Google Gemini</h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      {t("Integrated directly into multimodal search, visual asset generation, code-structural planning, and research benchmarks.")}
                    </p>
                  </div>
                </div>

                {/* Anthropic / Arc */}
                <div className="flex items-start gap-4">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-orange-50/50 border border-orange-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-800">Claude & Arc Workspace</h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      {t("Cognitive reasoning for complex logic formulation, alongside Arc spaces tailored for visual alignment during live tests.")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Micro Callout */}
            <div className="p-5.5 rounded-2xl bg-neutral-900 text-neutral-200 border border-black flex items-center gap-3 shadow-md">
              <span className="text-[20px] shrink-0 pointer-events-none">⚡</span>
              <p className="text-xs text-neutral-300 font-medium">
                {t("These core AI components are fully embedded into my architecture, increasing operational delivery speeds by up to 250%.")}
              </p>
            </div>
          </div>

          {/* Right: The 3D Cluster Block directly from the uploaded mockup */}
          <div className="lg:col-span-7 flex justify-center items-center">
            
            {/* Interactive perspective panel wrapper */}
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[500px] aspect-square rounded-[36px] bg-[#121214] p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.25)] flex items-center justify-center overflow-hidden border border-neutral-800/60 group cursor-grab active:cursor-grabbing"
              style={{
                perspective: 1200,
              }}
            >
              {/* Radial spotlight effect behind the badges */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)] pointer-events-none" />
              
              {/* Ambient grid lines for architectural context, matching the uploaded visual structure */}
              <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              {/* The responsive floating 3D cluster frame */}
              <motion.div 
                style={{
                  rotateX: rotateX,
                  rotateY: rotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative w-full h-full flex items-center justify-center"
              >
                
                {/* ==================================================================== */}
                {/* 1. VS CODE BADGE (Top-Left) */}
                {/* ==================================================================== */}
                <motion.div
                  drag
                  dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                  dragElastic={0.15}
                  whileHover={{ 
                    scale: 1.05, 
                    z: 50,
                    shadow: "0px 30px 40px rgba(0,0,0,0.6)"
                  }}
                  className="absolute w-[44%] aspect-square rounded-[24%] bg-[#1A1A1C] p-[5%] flex items-center justify-center shadow-[5px_5px_0px_#0b0b0c,10px_10px_25px_rgba(0,0,0,0.65)] border-t border-l border-white/10 select-none cursor-grab active:cursor-grabbing"
                  style={{
                    left: '5%',
                    top: '8%',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="relative w-full h-full flex items-center justify-center" style={{ transform: 'translateZ(25px)' }}>
                    {/* Recreating the 3D VS Code ribbon exactly */}
                    <svg className="w-[72%] h-[72%] filter drop-shadow-[4px_6px_5px_rgba(0,0,0,0.5)]" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="vscode-grad1" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#2392E5" />
                          <stop offset="100%" stopColor="#1C6CA1" />
                        </linearGradient>
                        <linearGradient id="vscode-grad2" x1="0" y1="0" x2="1" y2="0.8">
                          <stop offset="0%" stopColor="#32A3E8" />
                          <stop offset="100%" stopColor="#2F5BA9" />
                        </linearGradient>
                      </defs>
                      {/* Left vertical fold backplate */}
                      <path d="M43.7 75.3L153.2 240l28.2-13.8L43.7 75.3z" fill="url(#vscode-grad1)" opacity="0.9" />
                      {/* Origami overlay ribbon */}
                      <path d="M181.4 226.2V29.8L43.7 75.3l137.7 150.9z" fill="url(#vscode-grad2)" />
                      {/* Crossfold ribbon overlay */}
                      <path d="M43.7 75.3L12.5 98.4c-4.2 3.1-4.2 9.5 0 12.6l31.2 23.1V75.3z" fill="#1C6698" />
                      {/* VS Code iconic side fold wing */}
                      <path d="M181.4 29.8L219 12.2c4.4-2.1 9.4 1 9.4 5.9v219.8c0 4.9-5 8-9.4 5.9l-37.6-17.6V29.8z" fill="#3AA8E8" />
                    </svg>
                    
                    {/* Plastic reflection overlay */}
                    <div className="absolute inset-0 rounded-[20%] bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none" />
                  </div>
                </motion.div>


                {/* ==================================================================== */}
                {/* 2. CHATGPT / OPENAI BADGE (Top-Right) */}
                {/* ==================================================================== */}
                <motion.div
                  drag
                  dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                  dragElastic={0.15}
                  whileHover={{ 
                    scale: 1.05, 
                    z: 55,
                    shadow: "0px 30px 40px rgba(0,0,0,0.6)"
                  }}
                  className="absolute w-[44%] aspect-square rounded-[24%] bg-[#222328] p-[5%] flex items-center justify-center shadow-[5px_5px_0px_#0f0f12,10px_10px_25px_rgba(0,0,0,0.65)] border-t border-l border-white/8 select-none cursor-grab active:cursor-grabbing"
                  style={{
                    right: '5%',
                    top: '12%',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="relative w-full h-full flex items-center justify-center" style={{ transform: 'translateZ(25px)' }}>
                    {/* Recreating ChatGPT loop in vibrant 3D Neon mint green exactly */}
                    <svg className="w-[64%] h-[64%] filter drop-shadow-[4px_6px_5px_rgba(0,0,0,0.5)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="chatgpt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#10A37F" />
                          <stop offset="100%" stopColor="#5AE5C5" />
                        </linearGradient>
                      </defs>
                      {/* Spiraling floral loop logo mimicking 3D extrusion */}
                      <path 
                        d="M20.5 10.3c0-1.8-1-3.4-2.6-4.2c.4-1.2.3-2.6-.4-3.7c-1.1-1.7-3.1-2.4-4.9-1.9C11.5.1 9.9.4 8.7 1.4c-1.8-.4-3.6.3-4.5 1.9C3.5 4.4 3.4 5.8 3.8 7C2.2 7.8 1.2 9.4 1.2 11.2c0 1.8 1 3.4 2.6 4.2c-.4 1.2-.3 2.6.4 3.7c1.1 1.7 3.1 2.4 4.9 1.9C10.2 21.6 11.8 21.3 13 20.3c1.8.4 3.6-.3 4.5-1.9c.7-1.1.8-2.5.4-3.7c1.6-.8 2.6-2.4 2.6-4.2v-.2zm-8.5 7.4c-1 0-1.9-.3-2.6-.9l.1-.1l3.5-2V13l3 1.7v3.5c-.7.3-1.4.5-2.2.5l-1.8-.1zm-4.7-2.3l-2.9-1.7c-.5-.5-.8-1.2-.9-2c0-.8.3-1.6.8-2.2l.1.1l3.5 2v3.9l-1 .5l-2.4-.6v-.1zm-.8-6.1l.1-.2L10 7.4h.1l2.4-1.4l3 1.7v1.8V13l-3.5-2v-3.6zM15 13l-3-1.7v-3.5c1 0 1.9.3 2.6.9l2.9 1.7c.5.5.8 1.2.9 2c0 .8-.3 1.6-.8 2.2L15 13.1v-.1zm-4 1.5L7.5 12V8.5c.7-.3 1.4-.5 2.2-.5l1.8.1c1 0 1.9.3 2.6.9l-.1.1L10.5 11v3.5h.5zm4.8-1.2l-3.5-2V7.4l1-.5l2.9 1.7c.5.5.8 1.2.9 2c0 .8-.3 1.6-.8 2.2l-.5.1z" 
                        fill="url(#chatgpt-grad)" 
                        stroke="#22C55E" 
                        strokeWidth="0.2"
                      />
                    </svg>
                    
                    <div className="absolute inset-0 rounded-[20%] bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none" />
                  </div>
                </motion.div>


                {/* ==================================================================== */}
                {/* 3. GOOGLE GEMINI BADGE (Bottom-Left) */}
                {/* ==================================================================== */}
                <motion.div
                  drag
                  dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                  dragElastic={0.15}
                  whileHover={{ 
                    scale: 1.05, 
                    z: 60,
                    shadow: "0px 30px 45px rgba(0,0,0,0.7)"
                  }}
                  className="absolute w-[44%] aspect-square rounded-[24%] bg-[#FFFFFF] p-[5%] flex items-center justify-center shadow-[5px_5px_0px_#27282c,10px_10px_25px_rgba(0,0,0,0.55)] border-t border-l border-white select-none cursor-grab active:cursor-grabbing"
                  style={{
                    left: '10%',
                    bottom: '10%',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Subtle glossy ceramic gradient backplate */}
                  <div className="absolute inset-0 rounded-[24%] bg-gradient-to-tr from-[#EDEDED] via-[#FDFDFD] to-[#FFFFFF] pointer-events-none" />

                  <div className="relative w-full h-full flex items-center justify-center" style={{ transform: 'translateZ(25px)' }}>
                    {/* The 4-pointed Gemini Rainbow Sparkle with diagonal visual gradients */}
                    <svg className="w-[66%] h-[66%] filter drop-shadow-[5px_6px_6px_rgba(0,0,0,0.22)]" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        {/* Perfect diagonal rich linear gradient matching the Google sparkle */}
                        <linearGradient id="gemini-sparkle-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#4285F4" />
                          <stop offset="25%" stopColor="#9B51E0" />
                          <stop offset="50%" stopColor="#EA4335" />
                          <stop offset="75%" stopColor="#FBBC05" />
                          <stop offset="100%" stopColor="#34A853" />
                        </linearGradient>
                      </defs>
                      {/* Fluid, organic sparkle curves */}
                      <path 
                        d="M128 0C128 70.6924 185.308 128 256 128C185.308 128 128 185.308 128 256C128 185.308 70.6924 128 0 128C70.6924 128 128 70.6924 128 0Z" 
                        fill="url(#gemini-sparkle-grad)" 
                      />
                    </svg>

                    {/* Plastic dome reflection layer */}
                    <div className="absolute inset-0 rounded-[20%] bg-gradient-to-tr from-transparent via-[#FFFFFF]/[0.15] to-[#FFFFFF]/[0.4] pointer-events-none" />
                  </div>
                </motion.div>


                {/* ==================================================================== */}
                {/* 4. ANTHROPIC CLAUDE / RAINBOW ARCH BADGE (Bottom-Right / Foreground) */}
                {/* ==================================================================== */}
                <motion.div
                  drag
                  dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                  dragElastic={0.15}
                  whileHover={{ 
                    scale: 1.08, 
                    z: 70,
                    shadow: "0px 35px 50px rgba(0,0,0,0.75)"
                  }}
                  className="absolute w-[47%] aspect-square rounded-[24%] bg-[#19191B] p-[5%] flex items-center justify-center shadow-[6px_6px_0px_#070708,12px_12px_30px_rgba(0,0,0,0.75)] border-t border-l border-white/12 select-none z-30 cursor-grab active:cursor-grabbing"
                  style={{
                    right: '8%',
                    bottom: '6%',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="relative w-full h-full flex items-center justify-center" style={{ transform: 'translateZ(30px)' }}>
                    
                    {/* Recreating the iconic Rainbow Arch curve logo */}
                    <svg className="w-[74%] h-[74%] filter drop-shadow-[5px_7px_6px_rgba(0,0,0,0.55)]" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="rainbow-arch" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#EA4335" />
                          <stop offset="20%" stopColor="#FBBC05" />
                          <stop offset="40%" stopColor="#34A853" />
                          <stop offset="60%" stopColor="#4285F4" />
                          <stop offset="80%" stopColor="#9B51E0" />
                          <stop offset="100%" stopColor="#E91E63" />
                        </linearGradient>
                      </defs>
                      {/* Bold, thick, 3D arching logo shape from mockup */}
                      <path 
                        d="M30 150 C 30 50, 170 50, 170 150 C 135 150, 135 100, 100 100 C 65 100, 65 150, 30 150 Z" 
                        fill="url(#rainbow-arch)"
                        strokeWidth="2" 
                        stroke="#19191B"
                      />
                    </svg>

                    {/* Plastic shine layer */}
                    <div className="absolute inset-0 rounded-[20%] bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.09] pointer-events-none" />
                  </div>
                </motion.div>

              </motion.div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
