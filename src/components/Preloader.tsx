import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Notify on completion after a set loading time
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="fixed inset-0 z-[9999] bg-[#121212] text-white flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-2xl md:text-4xl font-bold tracking-tighter flex gap-2 overflow-hidden"
        >
          <TextAnim text="Android Dev" delay={0.4} />
          <span className="text-gray-500">&amp;</span>
          <TextAnim text="Creative Engineer" delay={0.8} />
        </motion.div>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="h-[2px] bg-white w-full max-w-[200px] mt-8 origin-left"
        />
      </div>
    </motion.div>
  );
}

function TextAnim({ text, delay }: { text: string; delay: number }) {
  return (
    <div className="flex">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.03,
            ease: [0.33, 1, 0.68, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}
