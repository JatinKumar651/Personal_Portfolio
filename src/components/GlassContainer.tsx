'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function GlassContainer({
  children,
  className = '',
  hover = false,
  glow = false,
}: GlassContainerProps) {
  return (
    <motion.div
      className={`glass ${glow ? 'box-glow-cyan' : ''} ${className}`}
      whileHover={
        hover
          ? {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderColor: 'rgba(0, 245, 255, 0.2)',
              transition: { duration: 0.3 },
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
