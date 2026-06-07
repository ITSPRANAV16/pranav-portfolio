import React, { ElementType } from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  as?: ElementType;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade-only';
  delay?: number;
  duration?: number;
  distance?: number;
  viewportMargin?: string;
  amount?: number | 'some' | 'all';
  once?: boolean;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

export function ScrollReveal({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 40,
  viewportMargin = '-100px',
  amount = 0.15,
  once = true,
  className = '',
  id,
  style,
  ...props
}: ScrollRevealProps) {
  const Component = motion.create(as as any);

  // Set directional offsets
  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { y: 0, x: distance };
      case 'right':
        return { y: 0, x: -distance };
      case 'scale':
        return { y: 0, x: 0, scale: 0.93 };
      case 'fade-only':
      default:
        return { y: 0, x: 0 };
    }
  };

  const initial = {
    opacity: 0,
    ...getInitialOffset(),
  };

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
  };

  return (
    <Component
      id={id}
      className={className}
      style={style}
      initial={initial}
      whileInView={animate}
      viewport={{ once, margin: viewportMargin, amount }}
      transition={{
        delay,
        duration,
        ease: [0.16, 1, 0.3, 1], // Custom cubic bezier curve for high-fidelity native feeling (easeOutExpo-like)
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

interface ScrollRevealStaggerProps {
  children: React.ReactNode;
  as?: ElementType;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade-only';
  distance?: number;
  viewportMargin?: string;
  amount?: number | 'some' | 'all';
  once?: boolean;
  className?: string;
  id?: string;
}

export function ScrollRevealStagger({
  children,
  as = 'div',
  staggerDelay = 0.12,
  direction = 'up',
  distance = 30,
  viewportMargin = '-100px',
  amount = 0.15,
  once = true,
  className = '',
  id,
}: ScrollRevealStaggerProps) {
  const Component = motion.create(as as any);

  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { y: 0, x: distance };
      case 'right':
        return { y: 0, x: -distance };
      case 'scale':
        return { y: 0, x: 0, scale: 0.95 };
      case 'fade-only':
      default:
        return { y: 0, x: 0 };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      ...getInitialOffset(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Recursively process children to inject variants if they are motion elements or wrapped.
  // Alternatively, we let children be standard elements and use the `group` class,
  // or Framer Motion variants cascade automatically through DOM hierarchy if we make children use motion.
  // To keep it clean and robust, we can map children to inherit variants if they are Framer Motion components,
  // or wrap child elements in motion.div elements with childVariants.
  const ReactChildren = React.Children.toArray(children);

  return (
    <Component
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin, amount }}
      variants={containerVariants}
    >
      {ReactChildren.map((child, index) => {
        if (React.isValidElement(child)) {
          // Wrap each child in a motion.div that inherits the layout variant
          return (
            <motion.div key={index} variants={childVariants} className="contents">
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </Component>
  );
}
