'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { skills, categoryColors, type Skill } from '@/data/skills';
import { SPRING_CONFIG } from '@/lib/spring';
import SkillNode from './SkillNode';
import { X } from 'lucide-react';

interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  prevX: number;
  prevY: number;
  skill: Skill;
}

export default function ForceGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [dimensions, setDimensions] = useState({ w: 1200, h: 800 });
  const dragRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);

  // Initialize particles
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    setDimensions({ w, h });

    const initial: Particle[] = skills.map((skill, i) => {
      const angle = (i / skills.length) * Math.PI * 2;
      const radius = Math.min(w, h) * 0.25;
      return {
        id: skill.id,
        x: w / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 100,
        y: h / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        prevX: 0,
        prevY: 0,
        skill,
      };
    });

    initial.forEach((p) => {
      p.prevX = p.x - p.vx;
      p.prevY = p.y - p.vy;
    });

    particlesRef.current = initial;
    setParticles([...initial]);
  }, []);

  // Verlet integration physics loop
  useEffect(() => {
    const simulate = () => {
      const pts = particlesRef.current;
      const damping = 0.998;
      const repulsion = 3000;
      const centerGravity = 0.0003;
      const connectionForce = 0.0001;
      const padding = 60;
      const { w, h } = dimensions;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        // Skip dragged particle
        if (dragRef.current && dragRef.current.id === p.id) continue;

        // Verlet integration
        const tempX = p.x;
        const tempY = p.y;
        p.x += (p.x - p.prevX) * damping;
        p.y += (p.y - p.prevY) * damping;
        p.prevX = tempX;
        p.prevY = tempY;

        // Center gravity (gentle pull)
        p.x += (w / 2 - p.x) * centerGravity;
        p.y += (h / 2 - p.y) * centerGravity;

        // Repulsion from other nodes
        for (let j = 0; j < pts.length; j++) {
          if (i === j) continue;
          const dx = p.x - pts[j].x;
          const dy = p.y - pts[j].y;
          const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
          if (dist < 200) {
            const force = repulsion / (dist * dist);
            p.x += (dx / dist) * force * 0.01;
            p.y += (dy / dist) * force * 0.01;
          }
        }

        // Connection forces (attraction to connected nodes)
        const connected = p.skill.connections;
        for (const connId of connected) {
          const other = pts.find((q) => q.id === connId);
          if (!other) continue;
          const dx = other.x - p.x;
          const dy = other.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 150) {
            p.x += dx * connectionForce;
            p.y += dy * connectionForce;
          }
        }

        // Boundary containment
        if (p.x < padding) p.x = padding;
        if (p.x > w - padding) p.x = w - padding;
        if (p.y < padding + 80) p.y = padding + 80;
        if (p.y > h - padding) p.y = h - padding;
      }

      setParticles([...pts]);
      animFrameRef.current = requestAnimationFrame(simulate);
    };

    animFrameRef.current = requestAnimationFrame(simulate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [dimensions]);

  // Draw connection lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.w;
    canvas.height = dimensions.h;

    ctx.clearRect(0, 0, dimensions.w, dimensions.h);

    particles.forEach((p) => {
      p.skill.connections.forEach((connId) => {
        const other = particles.find((q) => q.id === connId);
        if (!other) return;

        const dist = Math.sqrt(
          (p.x - other.x) ** 2 + (p.y - other.y) ** 2
        );
        const opacity = Math.max(0, 1 - dist / 400) * 0.15;

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    });
  }, [particles, dimensions]);

  const handleDragStart = useCallback((id: string, startX: number, startY: number) => {
    const p = particlesRef.current.find((q) => q.id === id);
    if (p) {
      dragRef.current = { id, offsetX: startX - p.x, offsetY: startY - p.y };
    }
  }, []);

  const handleDrag = useCallback((id: string, clientX: number, clientY: number) => {
    const p = particlesRef.current.find((q) => q.id === id);
    if (p && dragRef.current) {
      p.prevX = p.x;
      p.prevY = p.y;
      p.x = clientX - dragRef.current.offsetX;
      p.y = clientY - dragRef.current.offsetY;
    }
  }, []);

  const handleDragEnd = useCallback((id: string, velocityX: number, velocityY: number) => {
    const p = particlesRef.current.find((q) => q.id === id);
    if (p) {
      // "Toss" — apply velocity as displacement for Verlet
      p.prevX = p.x - velocityX * 0.1;
      p.prevY = p.y - velocityY * 0.1;
    }
    dragRef.current = null;
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING_CONFIG, delay: 0.2 }}
        className="absolute top-28 left-12 z-20"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-silver tracking-tight">
          SKILL MATRIX
        </h1>
        <p className="font-mono text-xs text-cyan/50 mt-2 tracking-widest">
          {'// DRAG · TOSS · CLICK TO EXPLORE'}
        </p>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-12 z-20 flex gap-4"
      >
        {Object.entries(categoryColors).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="font-mono text-[10px] text-silver/30 uppercase tracking-wider">
              {cat}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Connection lines canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Skill nodes */}
      {particles.map((p) => (
        <SkillNode
          key={p.id}
          particle={p}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onClick={() => setSelectedSkill(p.skill)}
        />
      ))}

      {/* Skill Detail Panel */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={SPRING_CONFIG}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[400px]"
          >
            <div className="glass rounded-2xl p-8 box-glow-cyan">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        categoryColors[selectedSkill.category],
                    }}
                  />
                  <h3 className="text-2xl font-bold text-silver">
                    {selectedSkill.name}
                  </h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedSkill(null)}
                  className="text-silver/30 hover:text-cyan transition-colors"
                >
                  <X size={18} />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-mono text-[10px] text-silver/40 tracking-widest uppercase">
                      Proficiency
                    </span>
                    <span className="font-mono text-xs text-cyan">
                      {selectedSkill.proficiency}%
                    </span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.proficiency}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${categoryColors[selectedSkill.category]}, #00F5FF)`,
                      }}
                    />
                  </div>
                </div>

                <p className="text-silver/50 text-sm leading-relaxed">
                  {selectedSkill.description}
                </p>

                <div>
                  <span className="font-mono text-[10px] text-silver/30 tracking-widest uppercase">
                    Connected Skills
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedSkill.connections.map((connId) => {
                      const conn = skills.find((s) => s.id === connId);
                      return conn ? (
                        <span
                          key={connId}
                          className="px-2 py-0.5 rounded-full text-[10px] font-mono border border-white/10 text-silver/50"
                        >
                          {conn.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for detail panel */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setSelectedSkill(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
