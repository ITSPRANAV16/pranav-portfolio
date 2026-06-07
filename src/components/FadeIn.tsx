import { motion } from 'motion/react';
import React, { ElementType } from 'react';

interface FadeInProps {
  key?: React.Key;
  children: React.ReactNode;
  as?: ElementType;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  id?: string;
  onClick?: () => void;
}

export default function FadeIn({
  children,
  as = 'div',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  id,
  ...props
}: FadeInProps) {
  // Use motion.create for dynamic tag types
  const Component = motion.create(as as any);

  return (
    <Component
      id={id}
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1], // Smooth easing curve
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
