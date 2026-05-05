import HeroSection from '@/components/home/HeroSection';
import StatusFeed from '@/components/home/StatusFeed';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-void">
      <HeroSection />
      <StatusFeed />
    </main>
  );
}
