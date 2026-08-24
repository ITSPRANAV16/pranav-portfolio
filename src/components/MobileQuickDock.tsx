import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Languages, 
  Briefcase, 
  Cpu, 
  Layers, 
  PhoneCall, 
  ChevronUp,
  MessageSquareHeart,
  Grid
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface MobileQuickDockProps {
  onContactClick: () => void;
}

export default function MobileQuickDock({ onContactClick }: MobileQuickDockProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Vibrate safely on mobile devices
  const triggerHaptic = (ms = 10) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(ms);
      } catch (e) {
        // Safe guard sandbox restrictions
      }
    }
  };

  // Hide the dock when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // Scrolling down - hide menu
        setIsVisible(false);
        setExpanded(false);
      } else {
        // Scrolling up - show menu
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleScrollTo = (id: string) => {
    triggerHaptic(15);
    setExpanded(false);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -30;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleLangToggle = () => {
    triggerHaptic(20);
    toggleLanguage();
  };

  const handleContactPress = () => {
    triggerHaptic(25);
    onContactClick();
  };

  return (
    <div className="md:hidden fixed bottom-6 inset-x-0 z-50 flex flex-col items-center justify-end px-4 pointer-events-none select-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex flex-col items-center gap-3 w-full max-w-[220px] pointer-events-auto"
          >
            {/* Expanded Quick jump overlay menu */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  className="w-full bg-[#121212]/92 backdrop-blur-2xl border border-white/10 rounded-[24px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-white"
                >
                  <p className="text-[10px] font-mono tracking-wider text-neutral-450 uppercase mb-3 text-center border-b border-white/5 pb-1.5">
                    {t("Quick Controls")}
                  </p>
                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      onClick={() => handleScrollTo("projects")}
                      className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 active:bg-white/10 transition-colors cursor-pointer"
                    >
                      <Briefcase className="w-5 h-5 text-sky-400" />
                      <span className="text-[10px] font-bold text-neutral-300">{t("Work")}</span>
                    </button>

                    <button
                      onClick={() => handleScrollTo("services")}
                      className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 active:bg-white/10 transition-colors cursor-pointer"
                    >
                      <Layers className="w-5 h-5 text-purple-400" />
                      <span className="text-[10px] font-bold text-neutral-300">{t("Build")}</span>
                    </button>

                    <button
                      onClick={() => handleScrollTo("skills")}
                      className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 active:bg-white/10 transition-colors cursor-pointer"
                    >
                      <Cpu className="w-5 h-5 text-emerald-400" />
                      <span className="text-[10px] font-bold text-neutral-300">{t("Skills")}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Core Sleek Control Island */}
            <div className="flex items-center justify-center gap-3 bg-white/80 backdrop-blur-3xl px-3.5 py-2.5 rounded-full border border-white/60 shadow-[0_12px_40px_rgba(0,0,0,0.12)] w-full">
              
              {/* Menu Jumper toggle */}
              <button
                id="doc-menu-toggle"
                onClick={() => {
                  triggerHaptic(12);
                  setExpanded(!expanded);
                }}
                className={`p-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  expanded 
                    ? "bg-[#121212] text-white rotate-45 shadow-sm" 
                    : "bg-neutral-900/5 text-neutral-700 hover:bg-neutral-900/10 active:scale-95"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>

              {/* Direct Message Talk Anchor */}
              <button
                id="doc-chat-fob"
                onClick={handleContactPress}
                className="flex items-center gap-1.5 bg-[#121212] text-white py-2 px-4 rounded-full font-bold text-[11px] hover:bg-black active:scale-[0.97] transition-all shadow-[0_4px_12px_rgba(18,18,18,0.25)] cursor-pointer"
              >
                <MessageSquareHeart className="w-3.5 h-3.5 text-rose-400" />
                <span>{t("Let's Talk")}</span>
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
