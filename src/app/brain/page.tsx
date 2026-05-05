'use client';

import dynamic from 'next/dynamic';

const ForceGraph = dynamic(() => import('@/components/brain/ForceGraph'), {
  ssr: false,
});

export default function BrainPage() {
  return (
    <main className="relative min-h-screen bg-void">
      <ForceGraph />
    </main>
  );
}
