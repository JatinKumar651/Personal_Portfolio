'use client';

import { useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { categoryColors } from '@/data/skills';

interface Particle {
  id: string;
  x: number;
  y: number;
  skill: {
    id: string;
    name: string;
    category: string;
    proficiency: number;
  };
}

interface SkillNodeProps {
  particle: Particle;
  onDragStart: (id: string, x: number, y: number) => void;
  onDrag: (id: string, x: number, y: number) => void;
  onDragEnd: (id: string, vx: number, vy: number) => void;
  onClick: () => void;
}

export default function SkillNode({
  particle,
  onDragStart,
  onDrag,
  onDragEnd,
  onClick,
}: SkillNodeProps) {
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0, time: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const didDrag = useRef(false);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      didDrag.current = false;
      lastPos.current = { x: e.clientX, y: e.clientY, time: Date.now() };
      velocity.current = { x: 0, y: 0 };
      onDragStart(particle.id, e.clientX, e.clientY);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [particle.id, onDragStart]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      didDrag.current = true;

      const now = Date.now();
      const dt = Math.max(now - lastPos.current.time, 1);
      velocity.current = {
        x: (e.clientX - lastPos.current.x) / dt * 16,
        y: (e.clientY - lastPos.current.y) / dt * 16,
      };
      lastPos.current = { x: e.clientX, y: e.clientY, time: now };

      onDrag(particle.id, e.clientX, e.clientY);
    },
    [particle.id, onDrag]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      onDragEnd(particle.id, velocity.current.x, velocity.current.y);

      if (!didDrag.current) {
        onClick();
      }
    },
    [particle.id, onDragEnd, onClick]
  );

  const color = categoryColors[particle.skill.category] || '#00F5FF';
  const size = 30 + (particle.skill.proficiency / 100) * 25;

  return (
    <motion.div
      className="absolute z-10 select-none touch-none"
      style={{
        left: particle.x - size / 2,
        top: particle.y - size / 2,
        width: size,
        height: size,
      }}
      whileHover={{ scale: 1.3 }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Node circle */}
      <div
        className="w-full h-full rounded-full flex items-center justify-center relative"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}40, ${color}10)`,
          border: `1px solid ${color}50`,
          boxShadow: `0 0 20px ${color}20, inset 0 0 15px ${color}10`,
        }}
      >
        <span
          className="font-mono text-[9px] font-bold tracking-wider whitespace-nowrap"
          style={{ color }}
        >
          {particle.skill.name}
        </span>
      </div>

      {/* Orbit ring (decorative) */}
      <div
        className="absolute inset-[-4px] rounded-full border opacity-20 animate-spin"
        style={{
          borderColor: `${color}30`,
          animationDuration: `${8 + Math.random() * 8}s`,
        }}
      />
    </motion.div>
  );
}
