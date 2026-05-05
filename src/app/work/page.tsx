'use client';

import dynamic from 'next/dynamic';

const KineticGallery = dynamic(() => import('@/components/work/KineticGallery'), {
  ssr: false,
});

export default function WorkPage() {
  return (
    <main className="relative min-h-screen bg-void">
      <KineticGallery />
    </main>
  );
}
