import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import SEO from './components/SEO';
import Preloader from './components/Preloader';
import InteractiveCursor from './components/InteractiveCursor';
import StickyHeader from './components/StickyHeader';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import ScrollProgress from './components/ScrollProgress';
import SkillsSection from './components/SkillsSection';
import AIToolsWorkspace from './components/AIToolsWorkspace';
import ExperienceSection from './components/ExperienceSection';
import AwardsSection from './components/AwardsSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ProcessSection from './components/ProcessSection';
import ContactModal from './components/ContactModal';
import ContactFinalSection from './components/ContactFinalSection';
import Footer from './components/Footer';
import CVManagerWidget from './components/CVManagerWidget';
import MobileQuickDock from './components/MobileQuickDock';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [settingsVersion, setSettingsVersion] = useState(0);
  const [showPulseDot, setShowPulseDot] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Magnetic spring values for the back-to-top button
  const bttButtonRef = useRef<HTMLButtonElement>(null);
  const bttMouseX = useMotionValue(0);
  const bttMouseY = useMotionValue(0);

  const bttSpringConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const bttMagneticX = useSpring(bttMouseX, bttSpringConfig);
  const bttMagneticY = useSpring(bttMouseY, bttSpringConfig);

  // Radial gradient glow coordinates
  const bttGradX = useMotionValue(28);
  const bttGradY = useMotionValue(28);
  const bttGradSpringX = useSpring(bttGradX, { damping: 20, stiffness: 300 });
  const bttGradSpringY = useSpring(bttGradY, { damping: 20, stiffness: 300 });

  const bttGradientBg = useTransform(
    [bttGradSpringX, bttGradSpringY],
    ([x, y]) => `radial-gradient(circle 50px at ${x}px ${y}px, rgba(14, 165, 233, 0.4) 0%, rgba(14, 165, 233, 0.1) 45%, rgba(14, 165, 233, 0) 80%), #0A0A0A`
  );

  const handleBttMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!bttButtonRef.current) return;
    const rect = bttButtonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const xDist = e.clientX - centerX;
    const yDist = e.clientY - centerY;
    bttMouseX.set(xDist * 0.35);
    bttMouseY.set(yDist * 0.35);

    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    bttGradX.set(localX);
    bttGradY.set(localY);
  };

  const handleBttMouseLeave = () => {
    bttMouseX.set(0);
    bttMouseY.set(0);
    if (bttButtonRef.current) {
      const rect = bttButtonRef.current.getBoundingClientRect();
      bttGradX.set(rect.width / 2);
      bttGradY.set(rect.height / 2);
    }
  };

  useEffect(() => {
    const handleSettingsChange = () => {
      setSettingsVersion(prev => prev + 1);
    };
    window.addEventListener('portfolio_settings_changed', handleSettingsChange);
    return () => window.removeEventListener('portfolio_settings_changed', handleSettingsChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showScrollToTop) {
      const timer = setTimeout(() => {
        setShowPulseDot(true);
      }, 10000);
      return () => clearTimeout(timer);
    } else {
      setShowPulseDot(false);
    }
  }, [showScrollToTop]);

  const scrollToTop = () => {
    // Subtle browser vibration (safe guarded)
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(15);
      } catch (e) {
        // Suppress errors about sandbox constraints or absence of hardware support
      }
    }
    
    // Trigger visual contraction effect
    setIsClicking(true);
    setTimeout(() => {
      setIsClicking(false);
    }, 250);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
         activeEl.tagName === 'TEXTAREA' ||
         activeEl.tagName === 'SELECT' ||
         activeEl.getAttribute('contenteditable') === 'true')
      ) {
        return;
      }

      if (e.key === 't' || e.key === 'T') {
        scrollToTop();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  return (
    <div
      id="main-app-wrapper"
      className="bg-[#F4F4F4] min-h-screen text-[#121212] font-sans antialiased relative selection:bg-black selection:text-white"
    >
      <SEO />
      <InteractiveCursor />
      <ScrollProgress />
      <AnimatePresence>
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      <motion.div
        key={`home-screen-${settingsVersion}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full relative"
        style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
      >
          {/* Always Accessible Scroll-Reveal Sticky Navigation with prominent CV Call-to-Action */}
          <StickyHeader onContactClick={handleOpenContact} />

          {/* SECTION 1: Hero Section */}
          <HeroSection onContactClick={handleOpenContact} />

          {/* SECTION 2: Projects (Featured Work) */}
          <ProjectsSection onContactClick={handleOpenContact} />

          {/* SECTION 3: Services */}
          <ServicesSection />

          {/* SECTION 3.2: Process / Approach */}
          <ProcessSection />

          {/* SECTION 3.5: Skills */}
          <SkillsSection />

          {/* SECTION 3.8: AI & Developer Workspace */}
          <AIToolsWorkspace />

          {/* SECTION 4: Experience */}
          <ExperienceSection />

          {/* SECTION 4.5: Awards & Recognitions */}
          <AwardsSection />

          {/* SECTION 5: Final Contact */}
          <ContactFinalSection onContactClick={handleOpenContact} />

          {/* SECTION 6: Footer */}
          <Footer />

          {/* Interactive Floating Contact Dialog */}
          <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />

          {/* Offline-First Admin CV Custom PDF Upload Portal */}
          <CVManagerWidget />

          {/* Mobile Quick Launcher & Active Control Hub */}
          <MobileQuickDock onContactClick={handleOpenContact} />

          {/* Back to Top Button */}
          <AnimatePresence>
            {showScrollToTop && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 flex items-center justify-center"
              >
                {/* Haptic click shockwave expanding ring */}
                <AnimatePresence>
                  {isClicking && (
                    <motion.span
                      style={{
                        x: bttMagneticX,
                        y: bttMagneticY,
                      }}
                      initial={{ opacity: 0.8, scale: 0.8 }}
                      animate={{ opacity: 0, scale: 1.8 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-sky-400 pointer-events-none z-10"
                    />
                  )}
                </AnimatePresence>

                <motion.button
                  ref={bttButtonRef}
                  onMouseMove={handleBttMouseMove}
                  onMouseLeave={handleBttMouseLeave}
                  style={{
                    x: bttMagneticX,
                    y: bttMagneticY,
                    background: bttGradientBg,
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isClicking ? { scale: 0.82 } : undefined}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  onClick={scrollToTop}
                  title="Back to Top"
                  className="relative overflow-hidden p-3 md:p-4 text-white rounded-full border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex items-center justify-center group cursor-pointer"
                >
                  {showPulseDot && (
                    <span className="absolute top-1.5 right-1.5 md:top-2 md:right-2 flex h-2 w-2 z-20">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                  )}
                  <ArrowUp className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform relative z-10 text-white" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
    </div>
  );
}
