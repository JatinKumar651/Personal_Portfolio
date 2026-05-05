'use client';

import { ReactNode } from 'react';
import CursorAura from '@/components/CursorAura';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CursorAura />
      <Navigation />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
