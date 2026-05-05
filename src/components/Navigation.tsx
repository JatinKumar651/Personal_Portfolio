'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { Home, Briefcase, Brain, Terminal } from 'lucide-react';
import { SPRING_CONFIG } from '@/lib/spring';

const navItems = [
  { href: '/', label: 'HOME', icon: Home },
  { href: '/work', label: 'WORK', icon: Briefcase },
  { href: '/brain', label: 'BRAIN', icon: Brain },
  { href: '/terminal', label: 'TERMINAL', icon: Terminal },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...SPRING_CONFIG, delay: 0.5 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]"
    >
      <div className="glass-static flex items-center gap-1 px-2 py-2 rounded-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className="relative px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/10 border border-cyan/20"
                    transition={SPRING_CONFIG}
                    style={{
                      boxShadow: '0 0 20px rgba(0, 245, 255, 0.15)',
                    }}
                  />
                )}
                <Icon
                  size={14}
                  className={`relative z-10 ${
                    isActive ? 'text-cyan' : 'text-silver/50'
                  }`}
                />
                <span
                  className={`relative z-10 font-mono text-xs tracking-widest ${
                    isActive ? 'text-cyan' : 'text-silver/50 hover:text-silver/80'
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
