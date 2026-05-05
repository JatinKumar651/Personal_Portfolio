'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SPRING_CONFIG } from '@/lib/spring';

interface TerminalLine {
  id: number;
  type: 'input' | 'output' | 'error' | 'system' | 'ascii';
  content: string;
}

const HELP_TEXT = `Available commands:

  about          — Who am I?
  projects       — View project archive
  skills         — ASCII skill breakdown
  socials        — Get social links
  contact        — How to reach me
  clear          — Clear terminal
  help           — Show this message

  Type any command and press Enter.`;

const ABOUT_TEXT = `
  ┌─────────────────────────────────────────┐
  │  JATIN                                  │
  │  Full Stack Engineer & AI Architect     │
  │                                         │
  │  Building at the intersection of        │
  │  intelligent systems and immersive      │
  │  interfaces. Specializing in RAG        │
  │  pipelines, real-time dashboards,       │
  │  and 3D web experiences.                │
  │                                         │
  │  Currently: Crafting the future.        │
  └─────────────────────────────────────────┘`;

const PROJECTS_TEXT = `
  ╔══════════════════════════════════════════╗
  ║  PROJECT ARCHIVE                        ║
  ╠══════════════════════════════════════════╣
  ║                                         ║
  ║  [01] NyayaVani                         ║
  ║       AI Legal Assistant + RAG          ║
  ║                                         ║
  ║  [02] OmniCopilot                       ║
  ║       Multi-Service AI Workspace        ║
  ║                                         ║
  ║  [03] Talking BI                        ║
  ║       Conversational BI Platform        ║
  ║                                         ║
  ║  [04] ShopIntel                         ║
  ║       Retail Surveillance Analytics     ║
  ║                                         ║
  ║  [05] FireReach                         ║
  ║       Automated Outreach Platform       ║
  ║                                         ║
  ╚══════════════════════════════════════════╝
  
  Navigate to /work for the full gallery.`;

const SKILLS_TEXT = `
  ╭─────────────────────────────────────╮
  │ SKILL MATRIX — Proficiency Chart    │
  ├─────────────────────────────────────┤
  │                                     │
  │ React     ████████████████████░░ 92 │
  │ Python    ████████████████████░░ 90 │
  │ Tailwind  ████████████████████░░ 90 │
  │ Next.js   ██████████████████░░░░ 88 │
  │ TypeScript██████████████████░░░░ 88 │
  │ RAG       █████████████████░░░░░ 86 │
  │ FastAPI   █████████████████░░░░░ 86 │
  │ Node.js   ████████████████░░░░░░ 85 │
  │ LangChain ████████████████░░░░░░ 84 │
  │ Java      ████████████████░░░░░░ 82 │
  │ PostgreSQL███████████████░░░░░░░ 80 │
  │ Docker    ███████████████░░░░░░░ 78 │
  │ Three.js  ██████████████░░░░░░░░ 72 │
  │                                     │
  ╰─────────────────────────────────────╯
  
  Navigate to /brain for interactive view.`;

const SOCIALS_TEXT = `
  ┌─────────────────────────────────────────┐
  │  CONNECT                                │
  ├─────────────────────────────────────────┤
  │                                         │
  │  GitHub    → github.com/JatinKumar651   │
  │  LinkedIn  → linkedin.com/in/jatin-kumar-1a5a25354/│
  │  Codepen   → codepen.io/Jatin-taak      │
  │  Email     → jatintaak3106@gmail.com    │
  │                                         │
  └─────────────────────────────────────────┘`;

const CONTACT_TEXT = `
  Reach out anytime:
  
  → Email: jatintaak3106@gmail.com
  → LinkedIn: linkedin.com/in/jatin-kumar-1a5a25354/
  
  Always open to interesting conversations 
  about AI, web3, and creative engineering.`;

const BOOT_LINES: TerminalLine[] = [
  { id: 0, type: 'system', content: '> TERMINAL v2.0 — JATIN PORTFOLIO SYSTEM' },
  { id: 1, type: 'system', content: '> Type "help" for available commands.' },
  { id: 2, type: 'system', content: '' },
];

export default function CLI() {
  const [lines, setLines] = useState<TerminalLine[]>(BOOT_LINES);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [glitching, setGlitching] = useState(false);
  const lineCounterRef = useRef(100);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  // Focus input on click anywhere
  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const triggerGlitch = useCallback(() => {
    setGlitching(true);
    setTimeout(() => setGlitching(false), 300);
  }, []);

  const addLines = useCallback(
    (newLines: Array<{ type: TerminalLine['type']; content: string }>) => {
      const toAdd: TerminalLine[] = newLines.map((l) => ({
        id: lineCounterRef.current++,
        ...l,
      }));
      setLines((prev) => [...prev, ...toAdd]);
    },
    []
  );

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      triggerGlitch();

      // Add input line
      addLines([{ type: 'input', content: `> ${cmd}` }]);

      if (!trimmed) return;

      // Add to history
      setHistory((prev) => [cmd, ...prev.slice(0, 49)]);
      setHistoryIndex(-1);

      switch (trimmed) {
        case 'help':
          addLines([{ type: 'output', content: HELP_TEXT }]);
          break;
        case 'about':
          addLines([{ type: 'ascii', content: ABOUT_TEXT }]);
          break;
        case 'projects':
          addLines([{ type: 'ascii', content: PROJECTS_TEXT }]);
          break;
        case 'skills':
          addLines([{ type: 'ascii', content: SKILLS_TEXT }]);
          break;
        case 'socials':
        case 'get socials':
          addLines([{ type: 'ascii', content: SOCIALS_TEXT }]);
          break;
        case 'contact':
          addLines([{ type: 'output', content: CONTACT_TEXT }]);
          break;
        case 'clear':
          setLines(BOOT_LINES);
          return;
        default:
          if (trimmed.startsWith('send message')) {
            const msg = cmd.slice(12).trim();
            if (msg) {
              addLines([
                { type: 'system', content: `> Encrypting message...` },
                { type: 'system', content: `> Message transmitted: "${msg}"` },
                { type: 'system', content: `> Status: DELIVERED ✓` },
              ]);
            } else {
              addLines([
                {
                  type: 'error',
                  content: '> Error: Message body required. Usage: send message <text>',
                },
              ]);
            }
          } else {
            addLines([
              {
                type: 'error',
                content: `> Command not recognized: "${trimmed}"`,
              },
              {
                type: 'system',
                content: '> Type "help" for available commands.',
              },
            ]);
          }
      }
    },
    [addLines, triggerGlitch]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div
      className={`min-h-screen bg-void pt-24 px-6 md:px-12 pb-8 ${
        glitching ? 'glitch-pulse' : ''
      }`}
      onClick={focusInput}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING_CONFIG, delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-silver tracking-tight">
          TERMINAL
        </h1>
        <p className="font-mono text-xs text-cyan/50 mt-2 tracking-widest">
          {'// THE FINAL INTERFACE'}
        </p>
      </motion.div>

      {/* Terminal Window */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING_CONFIG, delay: 0.4 }}
        className="glass rounded-xl max-w-4xl overflow-hidden"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
          <span className="ml-3 font-mono text-[10px] text-silver/30 tracking-widest">
            jatin@portfolio:~$
          </span>
        </div>

        {/* Output area */}
        <div className="p-6 max-h-[60vh] overflow-y-auto font-mono text-sm">
          <AnimatePresence>
            {lines.map((line) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={`whitespace-pre-wrap mb-0.5 ${
                  line.type === 'input'
                    ? 'text-silver'
                    : line.type === 'error'
                    ? 'text-red-400'
                    : line.type === 'system'
                    ? 'text-cyan/60'
                    : line.type === 'ascii'
                    ? 'text-cyan/80'
                    : 'text-silver/70'
                }`}
              >
                {line.content}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Input line */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-cyan/60 flex-shrink-0">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-silver font-mono text-sm caret-cyan"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <span className="cursor-blink text-cyan">▊</span>
          </div>

          <div ref={bottomRef} />
        </div>
      </motion.div>
    </div>
  );
}
