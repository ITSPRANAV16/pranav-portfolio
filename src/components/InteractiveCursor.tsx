import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  speed: number;
  type: 'circle' | 'sparkle' | 'ring';
}

const PRESET_COLORS = [
  'rgba(99, 102, 241, 0.65)',  // Indigo
  'rgba(168, 85, 247, 0.65)',  // Purple
  'rgba(236, 72, 153, 0.65)',  // Pink
  'rgba(45, 212, 191, 0.65)',  // Teal
  'rgba(251, 146, 60, 0.65)',  // Orange
];

export default function InteractiveCursor() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(true);
  const [hoverState, setHoverState] = useState<'none' | 'link' | 'button' | 'card'>('none');
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  const particleIdRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device is pointer-based to prevent displaying sparkles on mobile touches
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    setIsMobile(mediaQuery.matches);
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const dx = e.clientX - lastPositionRef.current.x;
      const dy = e.clientY - lastPositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only spawn particles if the mouse moved a minimum distance (e.g., 10px) to keep performance super high
      if (distance > 12) {
        spawnParticles(e.clientX, e.clientY);
        lastPositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect clickable hover states to change colors & emit sparkles dynamically!
    const handleMouseOver = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      while (target && target !== document.body) {
        if (target.classList.contains('project-card') || target.closest('[id="skills"]')) {
          setHoverState('card');
          return;
        }
        if (
          target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.closest('[data-social-icon]') ||
          target.classList.contains('cursor-pointer') ||
          window.getComputedStyle(target).cursor === 'pointer'
        ) {
          setHoverState('link');
          return;
        }
        target = target.parentElement;
      }
      setHoverState('none');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  // Handle auto-cleanup of older particles to keep memory light and pristine
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id > particleIdRef.current - 18));
    }, 1000);
    return () => clearTimeout(timer);
  }, [particles]);

  const spawnParticles = (clientX: number, clientY: number) => {
    const isHoverActive = hoverState !== 'none';
    const count = isHoverActive ? 3 : 1; // Emit more magical sparks on hovering links/buttons!
    
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particleIdRef.current += 1;
      
      // Random scale, speed, drift coefficients
      const size = Math.random() * (isHoverActive ? 14 : 8) + 4;
      const color = hoverState === 'link' 
        ? 'rgba(16, 185, 129, 0.7)' // Emerald sparkle
        : hoverState === 'card'
        ? PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)]
        : 'rgba(18, 18, 18, 0.15)'; // Elegant subtle gray dust for empty canvas backdrops

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      const types: Array<'circle' | 'sparkle' | 'ring'> = ['circle', 'sparkle', 'ring'];
      const type = types[Math.floor(Math.random() * types.length)];

      newParticles.push({
        id: particleIdRef.current,
        x: clientX + (Math.random() * 12 - 6),
        y: clientY + (Math.random() * 12 - 6),
        size,
        color,
        angle,
        speed,
        type
      });
    }

    setParticles(prev => [...prev, ...newParticles].slice(-24)); // Strict limit of max active particles
  };

  if (isMobile) return null;

  return (
    <>
      {/* 1. Ambient Background Mouse Orb Glow (Soft blurred tracker that sits gently beneath element layers) */}
      {isVisible && (
        <motion.div
          id="html-ambient-mouse-orb"
          className="fixed w-[280px] h-[280px] rounded-full pointer-events-none z-0 filter blur-[90px] mix-blend-multiply opacity-[0.06] transition-colors duration-500"
          style={{
            left: cursorPos.x - 140,
            top: cursorPos.y - 140,
            background: hoverState === 'link' 
              ? 'radial-gradient(circle, rgba(16,185,129,0.8) 0%, rgba(20,184,166,0) 70%)'
              : hoverState === 'card'
              ? 'radial-gradient(circle, rgba(147,51,234,0.8) 0%, rgba(236,72,153,0) 70%)'
              : 'radial-gradient(circle, rgba(18,18,18,0.3) 0%, rgba(0,0,0,0) 70%)',
          }}
          animate={{
            scale: hoverState !== 'none' ? 1.3 : 1,
          }}
          transition={{ type: 'spring', stiffness: 90, damping: 20 }}
        />
      )}

      {/* 2. Interactive Sparkle Trail Layer */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {particles.map(p => {
            const moveX = Math.cos(p.angle) * p.speed * 20;
            const moveY = Math.sin(p.angle) * p.speed * 20 - 25; // Drift upwards

            return (
              <motion.div
                key={p.id}
                initial={{ 
                  opacity: 0.8, 
                  scale: 0.2, 
                  x: p.x, 
                  y: p.y 
                }}
                animate={{ 
                  opacity: 0, 
                  scale: 1.4, 
                  x: p.x + moveX, 
                  y: p.y + moveY 
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.85, 
                  ease: [0.1, 0.8, 0.25, 1] 
                }}
                className="absolute origin-center"
                style={{
                  width: p.size,
                  height: p.size,
                  marginLeft: -p.size / 2,
                  marginTop: -p.size / 2,
                }}
              >
                {p.type === 'circle' && (
                  <div 
                    className="w-full h-full rounded-full" 
                    style={{ backgroundColor: p.color }}
                  />
                )}
                
                {p.type === 'ring' && (
                  <div 
                    className="w-full h-full rounded-full border border-current" 
                    style={{ 
                      color: p.color,
                      borderWidth: p.size > 8 ? '1.5px' : '1px' 
                    }}
                  />
                )}

                {p.type === 'sparkle' && (
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-full h-full" 
                    style={{ fill: p.color }}
                  >
                    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
                  </svg>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
}
