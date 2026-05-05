'use client';

import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Code2 } from 'lucide-react';
import type { Project } from '@/data/projects';

interface ProjectSlateProps {
  project: Project;
  index: number;
}

export default function ProjectSlate({ project, index }: ProjectSlateProps) {
  const slateRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showXRay, setShowXRay] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!slateRef.current) return;
    const rect = slateRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={slateRef}
      className="relative w-full h-[420px] rounded-2xl overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovering(true);
        setShowXRay(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        setShowXRay(false);
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      {/* Base layer — Project info */}
      <div className="glass absolute inset-0 p-8 flex flex-col justify-between z-10">
        {/* Top */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] text-cyan/50 tracking-widest">
              {String(index + 1).padStart(2, '0')} / {project.year}
            </span>
            <span className="font-mono text-[10px] text-silver/30 tracking-wider">
              {project.role}
            </span>
          </div>
          <h3 className="text-3xl font-bold text-silver tracking-tight mb-3">
            {project.title}
          </h3>
          <p className="text-silver/50 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Bottom */}
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-full text-[10px] font-mono border border-cyan/20 text-cyan/60 bg-cyan/5"
              >
                {tech}
              </span>
            ))}
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-silver/30 hover:text-cyan/80 transition-colors pointer-events-auto cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={14} />
            <span className="font-mono text-xs">VIEW PROJECT</span>
          </a>
        </div>
      </div>

      {/* X-Ray layer — Architecture / Code */}
      <div
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: showXRay ? 1 : 0,
          maskImage: showXRay
            ? `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`
            : 'none',
          WebkitMaskImage: showXRay
            ? `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`
            : 'none',
        }}
      >
        <div className="absolute inset-0 bg-void/95 backdrop-blur-xl p-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <Code2 size={14} className="text-cyan" />
            <span className="font-mono text-[10px] text-cyan tracking-widest">
              X-RAY — SYSTEM ARCHITECTURE
            </span>
          </div>
          <pre className="font-mono text-[11px] text-cyan/70 leading-relaxed whitespace-pre-wrap mb-4 overflow-hidden">
            {project.codeSnippet}
          </pre>
          <div className="border-t border-cyan/10 pt-3">
            <p className="font-mono text-[10px] text-silver/40 leading-relaxed">
              {project.architectureDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Hover border glow */}
      {isHovering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow:
              'inset 0 0 60px rgba(0, 245, 255, 0.08), 0 0 40px rgba(0, 245, 255, 0.05)',
          }}
        />
      )}
    </motion.div>
  );
}
