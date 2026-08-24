import React, { useRef } from 'react';
import { motion } from 'motion/react';
import FadeIn from './FadeIn';
import { OWNER_CONFIG } from '../config/owner';
import { FileText } from 'lucide-react';
import { handleCVDownload } from '../utils/cvStore';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onContactClick: () => void;
  id?: string;
}

export default function HeroSection({ onContactClick, id = 'hero' }: HeroSectionProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const colorImageRef = useRef<HTMLImageElement>(null);
  const { language, toggleLanguage, t } = useLanguage();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (imageRef.current && colorImageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      colorImageRef.current.style.WebkitMaskImage = `radial-gradient(circle 120px at ${x}px ${y}px, black 40%, transparent 100%)`;
      colorImageRef.current.style.maskImage = `radial-gradient(circle 120px at ${x}px ${y}px, black 40%, transparent 100%)`;
    }
  };

  const handleMouseEnter = () => {
    if (colorImageRef.current) {
      colorImageRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    if (colorImageRef.current) {
      colorImageRef.current.style.opacity = '0';
    }
  };

  const handleScrollTo = (elementId: string) => {
    if (elementId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(elementId);
    if (element) {
      const yOffset = -20;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id={id}
      className="min-h-screen md:min-h-screen flex flex-col justify-between overflow-x-hidden w-full relative bg-[#F4F4F4] pt-4 md:pt-8 pb-16 md:pb-12"
    >
      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} duration={0.8} as="nav" className="flex flex-row justify-between items-center w-full z-30 gap-4 px-4 md:px-8 lg:px-12">
        <div className="flex items-center gap-1.5 sm:gap-2 bg-white rounded-full px-3.5 py-2 sm:px-6 sm:py-3 shadow-sm border border-gray-100">
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-green-500 animate-pulse shrink-0"></span>
          <span className="text-xs sm:text-sm font-medium tracking-wide">
            <span className="inline sm:hidden">{t('Available')}</span>
            <span className="hidden sm:inline">{t('Available for New Project')}</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full border border-gray-200/50 shadow-sm text-neutral-600">
          <button onClick={() => handleScrollTo('hero')} className="hover:text-black hover:opacity-100 opacity-80 transition-all cursor-pointer text-[#0ea5e9]">
            {t('Who I Am')} <span className="text-gray-450 text-[9px] font-mono ml-0.5">[01]</span>
          </button>
          <button onClick={() => handleScrollTo('projects')} className="hover:text-black hover:opacity-100 opacity-80 transition-all cursor-pointer">
            {t('Featured Work')} <span className="text-gray-450 text-[9px] font-mono ml-0.5">[05]</span>
          </button>
          <button onClick={() => handleScrollTo('services')} className="hover:text-black hover:opacity-100 opacity-80 transition-all cursor-pointer">
            {t('What I Build')} <span className="text-gray-450 text-[9px] font-mono ml-0.5">[05]</span>
          </button>
          <button onClick={() => handleScrollTo('approach')} className="hover:text-black hover:opacity-100 opacity-80 transition-all cursor-pointer">
            {t('Approach')} <span className="text-gray-450 text-[9px] font-mono ml-0.5">[03]</span>
          </button>
          <button onClick={() => handleScrollTo('skills')} className="hover:text-black hover:opacity-100 opacity-80 transition-all cursor-pointer">
            {t('Skills')} <span className="text-gray-450 text-[9px] font-mono ml-0.5">[04]</span>
          </button>
          <button onClick={() => handleScrollTo('experience')} className="hover:text-black hover:opacity-100 opacity-80 transition-all cursor-pointer">
            {t('Experience')} <span className="text-gray-450 text-[9px] font-mono ml-0.5">[1y+]</span>
          </button>
          <button onClick={() => handleScrollTo('awards')} className="hover:text-black hover:opacity-100 opacity-80 transition-all cursor-pointer">
            {t('Awards')} <span className="text-gray-450 text-[9px] font-mono ml-0.5">[03]</span>
          </button>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onContactClick}
            className="bg-[#121212] text-white rounded-full px-4 py-2 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-medium hover:bg-black transition-colors flex items-center gap-1.5 sm:gap-2 group shrink-0"
          >
            {t("Let's Talk")}
            <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </button>
        </div>
      </FadeIn>

      {/* 2. Main Title & Portrait Area */}
      <div className="flex-1 flex items-end md:items-center justify-center relative w-full mt-6 md:mt-0">
        
        {/* Massive Background Text */}
        <FadeIn delay={0.2} y={30} duration={1} className="absolute inset-0 flex items-start pt-14 sm:pt-6 md:pt-20 lg:pt-24 justify-center select-none pointer-events-none z-10 w-full overflow-visible -translate-y-8 sm:translate-y-0 md:translate-y-2 lg:translate-y-4">
          <div className="flex flex-col md:flex-row items-center justify-center w-full gap-2 md:gap-12 lg:gap-16">
            <motion.span 
               initial={{ x: -100, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
               className="leading-none tracking-normal font-black uppercase text-center text-transparent" style={{ fontFamily: "'Google Sans', 'Product Sans', sans-serif", fontSize: 'clamp(2.5rem, 8vw, 10rem)', WebkitTextStroke: '2px #121212', letterSpacing: '0.04em' }}
            >
              PRANAV
            </motion.span>
            <motion.span 
               initial={{ x: 100, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
               className="leading-none tracking-tight text-[#121212] font-black uppercase text-center" style={{ fontFamily: "'Google Sans', 'Product Sans', sans-serif", fontSize: 'clamp(2.5rem, 8vw, 10rem)' }}
            >
              PATIL
            </motion.span>
          </div>
        </FadeIn>
 
         {/* Central Portrait Image */}
        <FadeIn delay={0.4} y={50} duration={1} className="relative z-20 h-auto md:h-full flex items-end justify-center pointer-events-none mt-12 md:mt-0 translate-y-16 sm:translate-y-0 md:-translate-y-12 lg:-translate-y-20">
          <div 
            className="relative h-[36vh] sm:h-[45vh] md:h-[54vh] xl:h-[62vh] w-auto pointer-events-auto drop-shadow-[0_10px_40px_rgba(0,0,0,0.2)]"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={imageRef}
          >
            <img
              src="/profil1.png" 
              alt="Portrait Base"
              className="h-full w-auto max-w-full object-contain object-bottom filter grayscale"
            />
            <img
              ref={colorImageRef}
              src="/profil1.png" 
              alt="Portrait Color Revealed"
              className="absolute inset-0 h-full w-auto max-w-full object-contain object-bottom transition-opacity duration-300 opacity-0"
            />
          </div>
        </FadeIn>
 
      </div>
 
      {/* 3. Floating Info Blocks */}
      <div className="relative md:absolute md:bottom-12 lg:bottom-20 md:left-0 w-full px-4 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center md:items-end z-40 pointer-events-none mt-10 md:mt-0 gap-8 md:gap-0 pb-6 md:pb-0">
        
        {/* Left Info */}
        <FadeIn delay={0.6} y={20} duration={0.8} className="pointer-events-auto bg-white md:bg-transparent border border-gray-100 md:border-transparent p-6 md:p-0 rounded-3xl shadow-sm md:shadow-none w-full max-w-[440px]">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2.5 md:mb-3 tracking-tight text-[#121212]">
            {language === 'mr' ? 'अँड्रॉइड प्रमुख आणि डिझायनर' : 'Android Dev &\nCreative Engineer'}
          </h2>
          <p className="text-gray-700 text-xs md:text-sm mb-4 leading-relaxed font-medium">
            {t(OWNER_CONFIG.tagline)}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={onContactClick} className="bg-[#121212] text-white rounded-full px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium hover:bg-black transition-transform hover:scale-105 flex items-center gap-2 group shadow-xl cursor-pointer">
              {t("Let's collaborate")}
              <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
          </div>
        </FadeIn>
 
        {/* Right Socials */}
        <FadeIn delay={0.7} y={20} duration={0.8} className="pointer-events-auto flex flex-row md:flex-col gap-2.5 justify-center md:justify-end flex-wrap w-full md:w-auto pb-2 md:pb-4">
          {Object.entries(OWNER_CONFIG.socials).map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="bg-white hover:bg-gray-50 border border-gray-100 shadow-sm rounded-full px-5 py-2.5 text-sm font-medium capitalize flex items-center gap-2 transition-transform hover:-translate-y-0.5"
            >
              <span className="w-4 h-4 rounded bg-gray-100 flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold">●</span>
              </span>
              {key === 'naukri' ? 'Naukri' : key}
            </a>
          ))}
        </FadeIn>
      </div>

    </section>
  );
}
