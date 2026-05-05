'use client';

import { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CursorAura() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  const springX = useSpring(cursorX, { stiffness: 80, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 80, damping: 20 });
  const dotSpringX = useSpring(dotX, { stiffness: 300, damping: 25 });
  const dotSpringY = useSpring(dotY, { stiffness: 300, damping: 25 });

  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);

      // Update CSS custom property for gravity well
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      {/* Outer glow ring */}
      <motion.div
        ref={auraRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: springX,
          y: springY,
          width: 40,
          height: 40,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40">
          <defs>
            <radialGradient id="aura-gradient">
              <stop offset="0%" stopColor="rgba(0, 245, 255, 0.4)" />
              <stop offset="100%" stopColor="rgba(0, 245, 255, 0)" />
            </radialGradient>
          </defs>
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="rgba(0, 245, 255, 0.3)"
            strokeWidth="1"
          />
          <circle
            cx="20"
            cy="20"
            r="19"
            fill="url(#aura-gradient)"
            opacity="0.3"
          />
        </svg>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotSpringX,
          y: dotSpringY,
          width: 8,
          height: 8,
          backgroundColor: '#00F5FF',
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(0, 245, 255, 0.6), 0 0 20px rgba(0, 245, 255, 0.3)',
        }}
      />
    </>
  );
}
