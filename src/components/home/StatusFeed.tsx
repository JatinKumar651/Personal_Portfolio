'use client';

import { motion } from 'motion/react';
import { useTypewriter } from '@/hooks/useTypewriter';
import { SPRING_CONFIG } from '@/lib/spring';

const STATUS_LINES = [
  '> SYSTEM BOOT... OK',
  '> INITIALIZING VOID SPACE... DONE',
  '> LOADING NEURAL PATHWAYS... DONE',
  '> PULLING REPOS... 42 SYNCED',
  '> COMPILING SKILL MATRIX... DONE',
  '> CALIBRATING ANTIGRAVITY FIELD... STABLE',
  '> PORTFOLIO LOADED... READY',
  '> AWAITING INPUT_',
];

export default function StatusFeed() {
  const { displayedLines, currentLine, isDone } = useTypewriter({
    lines: STATUS_LINES,
    typingSpeed: 30,
    pauseBetweenLines: 400,
    startDelay: 1500,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING_CONFIG, delay: 1.4 }}
      className="fixed bottom-8 left-8 z-20 max-w-md"
    >
      <div className="glass-static rounded-lg p-4 font-mono text-xs">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
          <div className="w-2 h-2 rounded-full bg-cyan/80 animate-pulse" />
          <span className="text-silver/30 tracking-widest uppercase text-[10px]">
            System Status
          </span>
        </div>
        <div className="space-y-1">
          {displayedLines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="text-cyan/60"
            >
              {line}
            </motion.p>
          ))}
          {currentLine && (
            <p className="text-cyan">
              {currentLine}
              <span className="cursor-blink ml-0.5">▊</span>
            </p>
          )}
          {isDone && (
            <p className="text-cyan/80">
              <span className="cursor-blink">▊</span>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
