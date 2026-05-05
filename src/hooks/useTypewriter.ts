'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface TypewriterOptions {
  lines: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseBetweenLines?: number;
  loop?: boolean;
  startDelay?: number;
}

interface TypewriterState {
  displayedLines: string[];
  currentLine: string;
  isTyping: boolean;
  isDone: boolean;
}

export function useTypewriter({
  lines,
  typingSpeed = 40,
  pauseBetweenLines = 800,
  loop = false,
  startDelay = 500,
}: TypewriterOptions): TypewriterState {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const lineIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const typeNext = useCallback(() => {
    const lineIdx = lineIndexRef.current;
    const charIdx = charIndexRef.current;

    if (lineIdx >= lines.length) {
      if (loop) {
        lineIndexRef.current = 0;
        charIndexRef.current = 0;
        setDisplayedLines([]);
        setCurrentLine('');
        timeoutRef.current = setTimeout(typeNext, pauseBetweenLines);
      } else {
        setIsTyping(false);
        setIsDone(true);
      }
      return;
    }

    const line = lines[lineIdx];

    if (charIdx <= line.length) {
      setCurrentLine(line.slice(0, charIdx));
      charIndexRef.current = charIdx + 1;
      timeoutRef.current = setTimeout(typeNext, typingSpeed + Math.random() * 30);
    } else {
      setDisplayedLines((prev) => [...prev, line]);
      setCurrentLine('');
      lineIndexRef.current = lineIdx + 1;
      charIndexRef.current = 0;
      timeoutRef.current = setTimeout(typeNext, pauseBetweenLines);
    }
  }, [lines, typingSpeed, pauseBetweenLines, loop]);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      typeNext();
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [typeNext, startDelay]);

  return { displayedLines, currentLine, isTyping, isDone };
}
