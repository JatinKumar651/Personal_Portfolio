'use client';

import dynamic from 'next/dynamic';
import StatusFeed from '@/components/home/StatusFeed';

const HeroSection = dynamic(() => import('@/components/home/HeroSection'), {
  ssr: false,
});

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-void">
      <HeroSection />
      <StatusFeed />
    </main>
  );
}
