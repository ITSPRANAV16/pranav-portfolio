import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  ArrowRight, 
  Menu, 
  X, 
  ExternalLink,
  User,
  Briefcase,
  Cpu,
  Compass,
  Layers,
  Trophy,
  ChevronRight
} from 'lucide-react';
import { OWNER_CONFIG } from '../config/owner';
import { handleCVDownload } from '../utils/cvStore';
import { useLanguage } from '../context/LanguageContext';

interface StickyHeaderProps {
  onContactClick: () => void;
}

export default function StickyHeader({ onContactClick }: StickyHeaderProps) {
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setVisible(true);
      } else {
        setVisible(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -40;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.header
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed top-4 inset-x-0 z-50 w-full px-4 sm:px-6 lg:px-8 pointer-events-none"
          >
            <div className="max-w-6xl mx-auto flex items-center justify-between bg-white/70 md:bg-white/45 backdrop-blur-2xl rounded-full border border-white/70 shadow-[0_12px_40px_-5px_rgba(0,0,0,0.08)] p-2 pointer-events-auto transition-all duration-300 hover:border-white/90">
              
              {/* Left Profile/Availability Badge */}
              <button 
                onClick={() => handleScrollTo('hero')}
                className="flex items-center gap-2.5 pl-2.5 group cursor-pointer text-left focus:outline-none"
              >
                <div className="relative w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-neutral-800 to-black hover:scale-105 active:scale-95 transition-transform flex items-center justify-center text-white font-sans font-black text-xs shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
                  P
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <p className="text-[11px] sm:text-xs font-black text-neutral-900 leading-none tracking-tight group-hover:text-sky-600 transition-colors uppercase">
                    {t('Pranav Patil')}
                  </p>
                  <p className="text-[8px] sm:text-[9px] font-mono text-neutral-500 font-bold tracking-wider uppercase mt-1 leading-none">
                    {t('Android Specialist')}
                  </p>
                </div>
              </button>

              {/* Center Menu Links (Desktop) */}
              <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-neutral-600">
                <button 
                  onClick={() => handleScrollTo('hero')} 
                  className="hover:text-black hover:opacity-100 opacity-100 transition-all cursor-pointer py-1 text-[#0ea5e9]"
                >
                  {t('Who I Am')}
                </button>
                <button 
                  onClick={() => handleScrollTo('projects')} 
                  className="hover:text-black hover:opacity-100 opacity-80 transition-all cursor-pointer py-1"
                >
                  {t('Featured Work')}
                </button>
                <button 
                  onClick={() => handleScrollTo('services')} 
                  className="hover:text-black hover:opacity-100 opacity-80 transition-all cursor-pointer py-1"
                >
                  {t('What I Build')}
                </button>
                <button 
                  onClick={() => handleScrollTo('approach')} 
                  className="hover:text-black hover:opacity-100 opacity-80 transition-all cursor-pointer py-1"
                >
                  {t('Approach')}
                </button>
                <button 
                  onClick={() => handleScrollTo('skills')} 
                  className="hover:text-black hover:opacity-100 opacity-80 transition-all cursor-pointer py-1"
                >
                  {t('Skills')}
                </button>
                <button 
                  onClick={() => handleScrollTo('experience')} 
                  className="hover:text-black hover:opacity-100 opacity-80 transition-all cursor-pointer py-1"
                >
                  {t('Experience')}
                </button>
                <button 
                  onClick={() => handleScrollTo('awards')} 
                  className="hover:text-black hover:opacity-100 opacity-80 transition-all cursor-pointer py-1"
                >
                  {t('Awards')}
                </button>
              </nav>

              {/* Right Side Buttons (Contact) */}
              <div className="flex items-center gap-2">
                
                {/* Let's Talk CTA */}
                <button
                  onClick={onContactClick}
                  className="hidden sm:flex bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200 rounded-full py-2 px-4 text-xs font-bold items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>{t("Let's Talk")}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Mobile Menu Toggle Pill Component */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-neutral-900 hover:bg-black text-white font-bold text-[10px] uppercase tracking-wider active:scale-95 transition-all cursor-pointer shadow-md"
                >
                  <span className="font-sans font-black tracking-widest text-[9px]">
                    {mobileMenuOpen ? t('CLOSE') : t('MENU')}
                  </span>
                  {mobileMenuOpen ? (
                    <X className="w-3.5 h-3.5 text-sky-400" />
                  ) : (
                    <Menu className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  )}
                </button>
              </div>

            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel Drawer Overlay */}
      <AnimatePresence>
        {visible && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed top-20 inset-x-4 z-40 md:hidden bg-white/85 backdrop-blur-3xl rounded-[32px] border border-white/60 p-5 shadow-[0_24px_50px_-15px_rgba(0,0,0,0.18)]"
          >
            {/* Top Indicator Badge */}
            <div className="flex items-center justify-between border-b border-neutral-900/5 pb-3 mb-3">
              <span className="text-[9px] font-mono text-neutral-500 font-extrabold tracking-widest uppercase">
                {t('Navigation System')}
              </span>
              <span className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[8px] font-bold rounded-full uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {t('Always Online')}
              </span>
            </div>

            <div className="flex flex-col gap-1.5 font-sans font-bold text-sm text-neutral-800">
              
              {/* Item 1 */}
              <button 
                onClick={() => handleScrollTo('hero')} 
                className="text-left py-2.5 px-3 rounded-2xl hover:bg-neutral-900/5 active:bg-neutral-900/10 transition-all flex items-center justify-between text-sky-600 border border-transparent cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-600">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black tracking-wide uppercase">{t('Who I Am')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <span className="text-[10px] font-mono font-bold">01</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Item 2 */}
              <button 
                onClick={() => handleScrollTo('projects')} 
                className="text-left py-2.5 px-3 rounded-2xl hover:bg-neutral-900/5 active:bg-neutral-900/10 transition-all flex items-center justify-between text-neutral-800 border border-transparent cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black tracking-wide uppercase">{t('Featured Work')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <span className="text-[10px] font-mono font-bold">02</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Item 3 */}
              <button 
                onClick={() => handleScrollTo('services')} 
                className="text-left py-2.5 px-3 rounded-2xl hover:bg-neutral-900/5 active:bg-neutral-900/10 transition-all flex items-center justify-between text-neutral-800 border border-transparent cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black tracking-wide uppercase">{t('What I Build')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <span className="text-[10px] font-mono font-bold">03</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Item 4 */}
              <button 
                onClick={() => handleScrollTo('approach')} 
                className="text-left py-2.5 px-3 rounded-2xl hover:bg-neutral-900/5 active:bg-neutral-900/10 transition-all flex items-center justify-between text-neutral-800 border border-transparent cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black tracking-wide uppercase">{t('Approach')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <span className="text-[10px] font-mono font-bold">04</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Item 5 */}
              <button 
                onClick={() => handleScrollTo('skills')} 
                className="text-left py-2.5 px-3 rounded-2xl hover:bg-neutral-900/5 active:bg-neutral-900/10 transition-all flex items-center justify-between text-neutral-800 border border-transparent cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-600">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black tracking-wide uppercase">{t('Skills')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <span className="text-[10px] font-mono font-bold">05</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Item 6 */}
              <button 
                onClick={() => handleScrollTo('experience')} 
                className="text-left py-2.5 px-3 rounded-2xl hover:bg-neutral-900/5 active:bg-neutral-900/10 transition-all flex items-center justify-between text-neutral-800 border border-transparent cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black tracking-wide uppercase">{t('Experience')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <span className="text-[10px] font-mono font-bold">06</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Item 7 */}
              <button 
                onClick={() => { setMobileMenuOpen(false); handleScrollTo('awards'); }} 
                className="text-left py-2.5 px-3 rounded-2xl hover:bg-neutral-900/5 active:bg-neutral-900/10 transition-all flex items-center justify-between text-neutral-800 border border-transparent cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black tracking-wide uppercase">{t('Awards')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <span className="text-[10px] font-mono font-bold">07</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
              
              {/* Bottom Custom CTA */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onContactClick();
                  }}
                  className="w-full justify-center bg-neutral-900 hover:bg-black text-white hover:scale-[1.01] rounded-2xl py-3 px-4 text-xs font-sans font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <span>{t("Let's Talk")}</span>
                  <ArrowRight className="w-4 h-4 text-sky-400" />
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
