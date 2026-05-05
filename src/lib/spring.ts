// Shared spring physics configuration for all animations
export const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
};

export const SPRING_SNAPPY = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

export const SPRING_GENTLE = {
  type: "spring" as const,
  stiffness: 60,
  damping: 15,
};

// Colors
export const COLORS = {
  void: '#000000',
  silver: '#E2E8F0',
  cyan: '#00F5FF',
  cyanDim: '#00F5FF80',
  glass: 'rgba(255, 255, 255, 0.05)',
  glassBorder: 'rgba(255, 255, 255, 0.08)',
} as const;
