'use client';

import dynamic from 'next/dynamic';

const CLI = dynamic(() => import('@/components/terminal/CLI'), {
  ssr: false,
});

export default function TerminalPage() {
  return (
    <main className="relative min-h-screen bg-void">
      <CLI />
    </main>
  );
}
