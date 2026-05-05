'use client';

import { useState, useEffect, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // 0 to 1
  normalizedY: number; // 0 to 1
  centerDistance: number; // 0 (center) to 1 (corner)
  velocityX: number;
  velocityY: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0.5,
    normalizedY: 0.5,
    centerDistance: 0,
    velocityX: 0,
    velocityY: 0,
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const nx = e.clientX / window.innerWidth;
    const ny = e.clientY / window.innerHeight;
    const dx = nx - 0.5;
    const dy = ny - 0.5;
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy) * 2, 1);

    setPosition((prev) => ({
      x: e.clientX,
      y: e.clientY,
      normalizedX: nx,
      normalizedY: ny,
      centerDistance: dist,
      velocityX: e.clientX - prev.x,
      velocityY: e.clientY - prev.y,
    }));
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return position;
}
