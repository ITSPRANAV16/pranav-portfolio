import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, ArrowRight, Menu, X, ExternalLink } from 'lucide-react';
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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
            <div className="max-w-6xl mx-auto flex items-center justify-between bg-white/90 backdrop-blur-md rounded-full border border-neutral-200/80 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.12)] p-2 pointer-events-auto">
              
              {/* Left Profile/Availability Badge */}
              <button 
                onClick={() => handleScrollTo('hero')}
                className="flex items-center gap-2 pl-3 group cursor-pointer text-left"
              >
                <div className="relative w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                  P
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white animate-pulse" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-black text-neutral-900 leading-none">{t('Pranav Patil').toUpperCase()}</p>
                  <p className="text-[9px] font-mono text-neutral-450 mt-0.5 uppercase tracking-wider font-bold">{t('Android Specialist')}</p>
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
                  className="hidden sm:flex bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200 rounded-full py-2 px-4 text-xs font-bold items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{t("Let's Talk")}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-full hover:bg-neutral-100 text-neutral-800 transition-colors cursor-pointer"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 inset-x-4 z-40 md:hidden bg-white/95 rounded-3xl border border-neutral-200/80 p-6 shadow-2xl backdrop-blur-lg"
          >
            <div className="flex flex-col gap-4 font-bold text-sm text-neutral-800">
              <button onClick={() => handleScrollTo('hero')} className="text-left py-2 border-b border-neutral-100 flex justify-between items-center text-[#0ea5e9]">
                <span>{t('Who I Am')}</span>
                <span className="text-xs text-neutral-400">01</span>
              </button>
              <button onClick={() => handleScrollTo('projects')} className="text-left py-2 border-b border-neutral-100 flex justify-between items-center">
                <span>{t('Featured Work')}</span>
                <span className="text-xs text-neutral-400">02</span>
              </button>
              <button onClick={() => handleScrollTo('services')} className="text-left py-2 border-b border-neutral-100 flex justify-between items-center">
                <span>{t('What I Build')}</span>
                <span className="text-xs text-neutral-400">03</span>
              </button>
              <button onClick={() => handleScrollTo('approach')} className="text-left py-2 border-b border-neutral-100 flex justify-between items-center">
                <span>{t('Our Approach')}</span>
                <span className="text-xs text-neutral-400">04</span>
              </button>
              <button onClick={() => handleScrollTo('skills')} className="text-left py-2 border-b border-neutral-100 flex justify-between items-center">
                <span>{t('Technical Skills')}</span>
                <span className="text-xs text-neutral-400">05</span>
              </button>
              <button onClick={() => handleScrollTo('experience')} className="text-left py-2 border-b border-neutral-100 flex justify-between items-center">
                <span>{t('Experience')}</span>
                <span className="text-xs text-neutral-400">06</span>
              </button>
              <button onClick={() => { setMobileMenuOpen(false); handleScrollTo('awards'); }} className="text-left py-2 border-b border-neutral-100 flex justify-between items-center">
                <span>{t('Awards')}</span>
                <span className="text-xs text-neutral-400">07</span>
              </button>
              
              <div className="pt-4 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onContactClick();
                  }}
                  className="w-full justify-center bg-[#121212] text-white hover:bg-neutral-800 rounded-2xl py-3 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
                >
                  <span>{t("Let's Talk")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
