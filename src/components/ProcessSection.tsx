import React from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  DraftingCompass, 
  Cpu, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    desc: 'Deep diving into problems, auditing existing solutions, mapping system requirements, and structuring a highly precise execution plan with realistic milestones.',
    icon: Compass,
    highlights: [
      'Scope auditing & feasibility report',
      'Feature definitions & constraints mapping',
      'Strategic timeline outlining'
    ],
    accent: 'bg-amber-500/10 text-amber-600 border-amber-250'
  },
  {
    num: '02',
    title: 'Architecture & Design',
    desc: 'Translating product goals into robust structural blueprints, modular UI layout components, responsive interactive user flows, and clear interactive mockups.',
    icon: DraftingCompass,
    highlights: [
      'Responsive Figma layout prototyping',
      'System context flows & data connections',
      'Component specs & transitions structure'
    ],
    accent: 'bg-blue-500/10 text-blue-600 border-blue-250'
  },
  {
    num: '03',
    title: 'Development & Caching',
    desc: 'Writing highly robust, scalable, and optimized codebases. Engineering dynamic layouts, smooth screen rendering, and secure local databases.',
    icon: Cpu,
    highlights: [
      'Native mobile engineering with Core Java',
      'Local persistence with Room Databases',
      'Highly modular MVVM logic flows'
    ],
    accent: 'bg-emerald-500/10 text-emerald-600 border-emerald-250'
  },
  {
    num: '04',
    title: 'Precision QA & Rollout',
    desc: 'A comprehensive, multi-phase technical audit, frame-rate performance tuning, leak detection checks, and final deployment setup.',
    icon: ShieldCheck,
    highlights: [
      'Diagnostics of memory leaks',
      'System-wide performance checks',
      'Reliable deploy pipelines setup'
    ],
    accent: 'bg-purple-500/10 text-purple-600 border-purple-250'
  }
];

export default function ProcessSection() {
  return (
    <section className="w-full bg-[#FAF9F5] text-[#121212] py-24 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12 relative overflow-hidden" id="approach">
      {/* Decorative clean ambient background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        
        {/* Title Group */}
        <div className="relative w-full flex flex-col items-center justify-center text-center pb-16 md:pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white border border-neutral-200/80 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          >
            <Sparkles className="w-3 h-3 text-emerald-500 animate-pulse" />
            Reliable Execution
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-[#121212] mb-3 uppercase"
          >
            My Approach
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-neutral-500 max-w-lg font-medium leading-relaxed"
          >
            A simple, logical fourstep engineering workflow prioritizing clean architecture, absolute reliability, and optimized mobile performance.
          </motion.p>
        </div>

        {/* Clean, simple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, idx) => {
            const StepIcon = step.icon;
            
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-neutral-200/80 rounded-[20px] p-6 flex flex-col relative select-none shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-neutral-300 transition-all duration-300 cursor-default"
              >
                {/* Header Icon + Number Label */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`p-3 rounded-xl border border-neutral-200/50 flex items-center justify-center ${step.accent.split(' ')[0]} ${step.accent.split(' ')[1]}`}>
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black font-mono text-neutral-400 bg-neutral-50 border border-neutral-150/50 px-2.5 py-1 rounded-full">
                    STEP {step.num}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#121212] mb-2 font-display leading-tight">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-neutral-500 leading-relaxed font-normal mb-5 flex-1">
                  {step.desc}
                </p>

                {/* Simple highlights list */}
                <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2.5">
                  <span className="text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                    Deliverables
                  </span>
                  <ul className="flex flex-col gap-1.5">
                    {step.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="text-[11px] text-neutral-600 font-medium flex items-start gap-1.5 leading-relaxed">
                        <span className="text-emerald-500 font-bold shrink-0">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
