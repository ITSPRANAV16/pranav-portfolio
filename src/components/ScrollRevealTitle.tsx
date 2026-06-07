import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealTitleProps {
  id?: string;
  className?: string; // Wrapper styling
  subtitle?: string;  // Kicker line (e.g., "Core Competencies")
  title: string;      // Heading text
  subtitleColorClass?: string; 
  subtitleClassName?: string;
  titleColorClass?: string;  
  fontSizeStyle?: React.CSSProperties; 
  titleClassName?: string;
}

export default function ScrollRevealTitle({
  id,
  className = 'w-full text-center mb-16 sm:mb-20 md:mb-24 px-4 font-sans',
  subtitle,
  title,
  subtitleColorClass = 'text-[#0EA5E9]/80',
  subtitleClassName = 'text-xs',
  titleColorClass,
  fontSizeStyle,
  titleClassName = '',
}: ScrollRevealTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px', // Triggers gracefully as the element rolls into viewport view
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const words = title.split(' ');

  // Refined responsive font sizing for balanced, high-fidelity visual layouts
  const defaultFontSize = title.toLowerCase() === 'about me' || title.toLowerCase() === 'projects' || title.toLowerCase() === 'expertise'
    ? { fontSize: 'clamp(2rem, 6vw, 70px)' }
    : { fontSize: 'clamp(1.5rem, 5vw, 50px)' };

  const finalFontSizeStyle = fontSizeStyle || defaultFontSize;
  const finalTitleColorClass = titleColorClass || 'text-[#D7E2EA]';

  return (
    <div
      id={id}
      ref={containerRef}
      className={`${className} flex flex-col items-center select-none`}
    >
      {/* Subtitle / Kicker block - slide down & fade in */}
      {subtitle && (
        <span
          className={`${subtitleClassName} uppercase tracking-[0.3em] font-black ${subtitleColorClass} mb-4 block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            hasRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
          }`}
        >
          {subtitle}
        </span>
      )}

      {/* Main Heading block - Masked Staggered word animation */}
      <h2
        className={`hero-heading font-black uppercase text-center tracking-tight leading-[1.05] ${finalTitleColorClass} ${titleClassName} flex flex-wrap justify-center gap-x-[0.24em]`}
        style={finalFontSizeStyle}
      >
        {words.map((word, wordIdx) => (
          <span 
            key={wordIdx} 
            className="inline-block overflow-hidden pb-[0.15em] pt-[0.05em]"
          >
            <span
              className={`inline-block transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                hasRevealed ? 'translate-y-0 opacity-100' : 'translate-y-[110%] opacity-0'
              }`}
              style={{
                transitionDelay: `${wordIdx * 75 + 100}ms`,
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </h2>
    </div>
  );
}
