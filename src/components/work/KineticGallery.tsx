'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import ProjectSlate from './ProjectSlate';
import { projects } from '@/data/projects';
import { SPRING_CONFIG } from '@/lib/spring';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function KineticGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });

  const slateWidth = 560; // px per project slate
  const gap = 40;
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const leftSpacer = viewportWidth * 0.3; // 30vw
  const totalWidth = leftSpacer + projects.length * (slateWidth + gap) + viewportWidth * 0.1;
  const maxDrag = -(totalWidth - viewportWidth);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const current = x.get();
    const delta = direction === 'left' ? slateWidth + gap : -(slateWidth + gap);
    const next = Math.max(maxDrag, Math.min(0, current + delta));
    x.set(next);
  }, [x, maxDrag, slateWidth, gap]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING_CONFIG, delay: 0.2 }}
        className="absolute top-28 left-12 z-20"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-silver tracking-tight">
          THE VAULT
        </h1>
        <p className="font-mono text-xs text-cyan/50 mt-2 tracking-widest">
          {'// SELECTED WORKS — DRAG OR SCROLL'}
        </p>
      </motion.div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-12 right-12 z-20 flex gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scroll('left')}
          className="glass-static w-12 h-12 rounded-full flex items-center justify-center text-silver/50 hover:text-cyan transition-colors"
        >
          <ChevronLeft size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scroll('right')}
          className="glass-static w-12 h-12 rounded-full flex items-center justify-center text-silver/50 hover:text-cyan transition-colors"
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Project Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-12 left-12 z-20 font-mono text-xs text-silver/30"
      >
        {projects.length} PROJECTS LOADED
      </motion.div>

      {/* Scrollable gallery */}
      <motion.div
        ref={containerRef}
        className="absolute top-0 left-0 h-full flex items-center pl-12 gap-10"
        style={{ x: springX }}
        drag="x"
        dragConstraints={{ left: maxDrag, right: 0 }}
        dragElastic={0.1}
        dragMomentum={true}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        onWheel={(e) => {
          const current = x.get();
          const next = Math.max(maxDrag, Math.min(0, current - e.deltaY * 2));
          x.set(next);
        }}
      >
        {/* Left spacer for header */}
        <div className="flex-shrink-0 w-[30vw]" />

        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 60, rotateY: -15 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{
              ...SPRING_CONFIG,
              delay: 0.3 + index * 0.15,
            }}
            className="flex-shrink-0"
            style={{ width: slateWidth }}
          >
            <ProjectSlate project={project} index={index} />
          </motion.div>
        ))}

        {/* Right spacer */}
        <div className="flex-shrink-0 w-[20vw]" />
      </motion.div>
    </div>
  );
}
