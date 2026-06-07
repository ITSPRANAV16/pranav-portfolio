import React from 'react';
import { motion } from 'motion/react';

interface GlowingDividerProps {
  className?: string; // Additional margin/layout styling
}

export default function GlowingDivider({ className = '' }: GlowingDividerProps) {
  return (
    <div className={`w-full max-w-5xl mx-auto flex items-center justify-center relative select-none ${className}`}>
      
      {/* Symmetrical Left Wing - animates outwards from center */}
      <div className="w-1/2 overflow-hidden h-[1px] relative flex justify-end">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[1px] bg-gradient-to-l from-[#0EA5E9]/80 via-[#0EA5E9]/20 to-transparent origin-right"
        />
      </div>

      {/* Decorative Center Jewel (Pulsing Diamond) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 150 }}
        className="relative mx-3 shrink-0"
      >
        {/* Animated Radial Glow behind the jewel */}
        <div className="absolute inset-0 bg-[#0EA5E9] blur-[6px] rounded-full opacity-60 w-3 h-3 -translate-x-0.5 -translate-y-0.5 animate-pulse-slow" />
        
        {/* Outer styling for active tech emblem */}
        <div className="w-2 h-2 rotate-45 border border-[#0EA5E9] bg-[#0C0C0C] relative z-10 flex items-center justify-center">
          <div className="w-1 h-1 bg-cyan-400 rounded-full" />
        </div>
      </motion.div>

      {/* Symmetrical Right Wing - animates outwards from center */}
      <div className="w-1/2 overflow-hidden h-[1px] relative flex justify-start">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[1px] bg-gradient-to-r from-[#0EA5E9]/80 via-[#0EA5E9]/20 to-transparent origin-left"
        />
      </div>

      {/* Background Soft Global Radial Glow */}
      <div className="absolute inset-x-12 h-[1px] bg-[#0EA5E9]/10 blur-[3px] pointer-events-none" />
    </div>
  );
}
