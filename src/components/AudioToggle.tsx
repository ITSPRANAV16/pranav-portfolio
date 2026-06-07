import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioToggle() {
  const [isMuted, setIsMuted] = useState(true);

  const toggleAudio = () => {
    setIsMuted(!isMuted);
    // In the future, this will hook into a global audio context
    // or HTML5 audio element to mute/unmute site sounds.
  };

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#0C0C0C]/80 border border-[#0EA5E9]/30 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-[#0EA5E9]/10 transition-colors group cursor-pointer"
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      <div className="relative w-6 h-6 flex items-center justify-center text-[#D7E2EA] group-hover:text-[#0EA5E9] transition-colors">
        <AnimatePresence mode="wait">
          {isMuted ? (
            <motion.div
              key="muted"
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <VolumeX className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="unmuted"
              initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Volume2 className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Subtle glowing ring when unmuted */}
        {!isMuted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute inset-[-4px] rounded-full border border-[#0EA5E9]/40 pointer-events-none"
          />
        )}
      </div>
    </button>
  );
}
