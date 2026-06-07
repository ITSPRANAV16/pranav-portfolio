import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import React, { useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export default function AnimatedText({ text, className = '', style, id }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = text.split('');
  const totalChars = chars.length;

  return (
    <p
      id={id}
      ref={containerRef}
      className={`${className} flex flex-wrap justify-center`}
      style={style}
    >
      {chars.map((char, index) => {
        if (char === ' ') {
          return <span key={index}>&nbsp;</span>;
        }

        // Calculate custom scroll timing window for each character
        // Soft gradient effect using character position index across the text length
        const start = index / totalChars;
        const end = Math.min(1, (index + 8) / totalChars); // comfortable overlap for smooth flow

        return (
          <Character
            key={index}
            char={char}
            progress={scrollYProgress}
            start={start}
            end={end}
          />
        );
      })}
    </p>
  );
}

interface CharacterProps {
  key?: React.Key;
  char: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}

function Character({ char, progress, start, end }: CharacterProps) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block select-none">
      {/* Invisible placeholder to reserve visual layout flow */}
      <span className="opacity-0 pointer-events-none">{char}</span>
      {/* Absolute animated span to overlay and fade in */}
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}
