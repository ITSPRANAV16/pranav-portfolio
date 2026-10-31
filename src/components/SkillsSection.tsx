import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Code2, Database, Layout, Smartphone, 
  Terminal, Settings, Box, GitBranch, Folder,
  Search, CheckCircle2, Wand2, Plus, Grip, Cpu
} from 'lucide-react';
import { OWNER_CONFIG } from '../config/owner';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal, ScrollRevealStagger } from './ScrollReveal';

// Icons used purely for visual aesthetics in the wave
const WAVE_ICONS = [
  Sparkles, Grip, Search, Code2, CheckCircle2, 
  Wand2, Box, GitBranch, Folder, Database, 
  Plus, Terminal, Layout, Smartphone
];

export default function SkillsSection({ id = 'skills' }: { id?: string }) {
  const allSkills = OWNER_CONFIG.skillCategories.flatMap(c => c.skills);
  const { t } = useLanguage();
  
  // We'll duplicate several times to make a very long continuous wave
  const duplicatedSkills = [...allSkills, ...allSkills, ...allSkills, ...allSkills, ...allSkills, ...allSkills];

  return (
    <section
      id={id}
      className="bg-[#F4F4F4] text-[#121212] py-32 md:py-48 select-none w-full relative overflow-hidden"
    >
      {/* Title Header Animation */}
      <ScrollReveal 
        direction="up" 
        distance={40} 
        viewportMargin="-80px"
        className="max-w-[1400px] mx-auto px-4 md:px-8 mb-24 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">
          {t("TECHNICAL SKILLS")}
        </h2>
        <p className="text-gray-500 font-medium max-w-2xl mx-auto">
          {t("The tools, languages, and frameworks I use to build scalable, high-performance applications.")}
        </p>
      </ScrollReveal>

      {/* The Wave Marquee with Scale/Fade reveal */}
      <ScrollReveal 
        direction="scale" 
        duration={0.9}
        viewportMargin="-80px"
        className="relative w-full h-[300px] flex items-center overflow-hidden"
      >
        {/* Fading edges to blend seamlessly */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F4F4F4] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F4F4F4] to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex gap-4 md:gap-6 min-w-max items-center px-32"
          animate={{ x: [0, -4000] }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
        >
          {duplicatedSkills.map((skill, index) => {
            // Create a smoother, wider sine wave offset
            const offset = Math.sin(index * 0.4) * 80;
            const IconComponent = WAVE_ICONS[index % WAVE_ICONS.length];

            return (
              <div
                key={`${skill}-${index}`}
                style={{ transform: `translateY(${offset}px)` }}
                className="flex-shrink-0 bg-white hover:bg-neutral-900 border border-gray-200/80 hover:border-neutral-900 shadow-sm flex items-center gap-2.5 px-4 md:px-5 py-2.5 md:py-3 rounded-full cursor-pointer group relative transition-colors duration-300"
              >
                <IconComponent className="w-4 h-4 text-neutral-800 group-hover:text-white transition-transform group-hover:scale-110" strokeWidth={1.5} />
                <span className="text-xs md:text-sm font-semibold text-neutral-800 group-hover:text-white tracking-tight">
                  {skill}
                </span>
              </div>
            );
          })}
        </motion.div>
      </ScrollReveal>

      {/* Categorized Skills Grid */}
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 mt-24">
        {/* Section title for categorised skill cards */}
        <ScrollReveal
          direction="up"
          distance={30}
          viewportMargin="-80px"
          className="text-center mb-12"
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 bg-neutral-900/5 px-3 py-1.5 rounded-full inline-block mb-3">
            {t("Exploration By Domain")}
          </span>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-850 uppercase">
            {t("Categorized Proficiency")}
          </h3>
        </ScrollReveal>

        {/* Categories Stagger Grid reveal */}
        <ScrollRevealStagger 
          direction="up"
          distance={30}
          staggerDelay={0.08}
          viewportMargin="-80px"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {OWNER_CONFIG.skillCategories.map((cat) => {
            // Pick a matching icon for the category
            let IconComponent = Code2;
            if (cat.name.includes('Android')) IconComponent = Smartphone;
            else if (cat.name.includes('Databases')) IconComponent = Database;
            else if (cat.name.includes('Tools')) IconComponent = Settings;
            else if (cat.name.includes('IoT')) IconComponent = Cpu;

            return (
              <div
                key={cat.name}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 shadow-sm flex flex-col justify-start transition-all duration-300 hover:shadow-md hover:-translate-y-1.5 h-full"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
                    <IconComponent className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-bold text-xs tracking-wider uppercase text-neutral-800">
                    {t(cat.name)}
                  </h4>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {cat.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 transition-colors rounded-lg text-[11px] text-neutral-600 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
