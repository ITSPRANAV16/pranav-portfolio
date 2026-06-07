import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-[#0EA5E9] via-[#0EA5E9] to-cyan-400 z-50 origin-[0%]"
      style={{
        scaleX,
        boxShadow: '0 2px 10px rgba(182, 0, 168, 0.5)'
      }}
    />
  );
}
