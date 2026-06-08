import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, ArrowUp, Briefcase } from 'lucide-react';
import { OWNER_CONFIG } from '../config/owner';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#FAFAFA] text-neutral-500 py-16 px-6 sm:px-10 lg:px-16 border-t border-neutral-200">
      <div className="max-w-[1400px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          
          {/* Column 1: Brand & Status (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-start select-none">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-neutral-900 flex items-center gap-2">
              {t(OWNER_CONFIG.name)}
            </h2>
            <p className="text-xs font-mono tracking-wider uppercase mt-1 text-neutral-400 font-semibold">
              {t(OWNER_CONFIG.role)}
            </p>
            
            {/* Live Indicator Status Pill */}
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t("Available for new opportunities")}</span>
            </div>

            <p className="text-xs text-neutral-400 mt-6 max-w-sm leading-relaxed">
              {t("Crafting reliable, responsive mobile and web experiences that perform under loading constraints and delight users globally.")}
            </p>
          </div>

          {/* Column 2: Sitemap & Navigation (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-start">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-4">
              {t("Explore Sitemap")}
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
              <button 
                onClick={() => handleScrollTo('hero')}
                className="text-sm text-neutral-600 hover:text-neutral-900 font-medium text-left transition-colors cursor-pointer hover:translate-x-1 duration-200 transform inline-block text-[#0ea5e9]"
              >
                {t("Who I Am")}
              </button>
              <button 
                onClick={() => handleScrollTo('projects')}
                className="text-sm text-neutral-600 hover:text-neutral-900 font-medium text-left transition-colors cursor-pointer hover:translate-x-1 duration-200 transform inline-block"
              >
                {t("Featured Work")}
              </button>
              <button 
                onClick={() => handleScrollTo('services')}
                className="text-sm text-neutral-600 hover:text-neutral-900 font-medium text-left transition-colors cursor-pointer hover:translate-x-1 duration-200 transform inline-block"
              >
                {t("What I Build")}
              </button>
              <button 
                onClick={() => handleScrollTo('approach')}
                className="text-sm text-neutral-600 hover:text-neutral-900 font-medium text-left transition-colors cursor-pointer hover:translate-x-1 duration-200 transform inline-block"
              >
                {t("Our Approach")}
              </button>
              <button 
                onClick={() => handleScrollTo('skills')}
                className="text-sm text-neutral-600 hover:text-neutral-900 font-medium text-left transition-colors cursor-pointer hover:translate-x-1 duration-200 transform inline-block"
              >
                {t("Tech Stack")}
              </button>
              <button 
                onClick={() => handleScrollTo('experience')}
                className="text-sm text-neutral-600 hover:text-neutral-900 font-medium text-left transition-colors cursor-pointer hover:translate-x-1 duration-200 transform inline-block"
              >
                {t("Experience")}
              </button>
              <button 
                onClick={() => handleScrollTo('awards')}
                className="text-sm text-neutral-600 hover:text-neutral-900 font-medium text-left transition-colors cursor-pointer hover:translate-x-1 duration-200 transform inline-block"
              >
                {t("Awards")}
              </button>
            </div>
          </div>

          {/* Column 3: Contact & Social Connection (3 cols) */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-4 md:text-right w-full">
              {t("Connect With Me")}
            </h3>
            
            {/* Social Icons Layout */}
            <div className="flex items-center gap-3.5 mb-6">
              <a
                href={OWNER_CONFIG.socials.github}
                target="_blank"
                rel="noreferrer"
                title="Github"
                className="w-10 h-10 rounded-xl bg-white border border-neutral-200 text-neutral-600 flex items-center justify-center hover:bg-neutral-900 hover:border-neutral-900 hover:text-white hover:scale-105 active:scale-95 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
              <a
                href={OWNER_CONFIG.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                title="Linkedin"
                className="w-10 h-10 rounded-xl bg-white border border-neutral-200 text-neutral-600 flex items-center justify-center hover:bg-[#0077B5] hover:border-[#0077B5] hover:text-white hover:scale-105 active:scale-95 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a
                href={OWNER_CONFIG.socials.naukri || OWNER_CONFIG.socials.dribbble}
                target="_blank"
                rel="noreferrer"
                title="Naukri (Job Portal)"
                className="w-10 h-10 rounded-xl bg-white border border-neutral-200 text-neutral-600 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:text-white hover:scale-105 active:scale-95 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              >
                <Briefcase className="w-4.5 h-4.5" />
              </a>
            </div>

            {/* Quick interactive back to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs font-mono font-bold uppercase tracking-widest text-[#0EA5E9] hover:text-neutral-900 transition-colors cursor-pointer flex items-center gap-1.5 self-start md:self-end"
            >
              {t("Back to top")}
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 border-t border-neutral-200/70 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs select-none">
          <p className="text-neutral-400">
            &copy; {currentYear} {t(OWNER_CONFIG.name)}. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[10px] tracking-wider uppercase font-bold">
            <span>{t("Designed purposefully")}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
            <span>{t("Built offline first")}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
