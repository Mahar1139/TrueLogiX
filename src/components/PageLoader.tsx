'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

export function PageLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    window.addEventListener('navigation-start', handleStart);
    return () => window.removeEventListener('navigation-start', handleStart);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[999] flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300',
        loading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="revolve-container relative flex items-center justify-center h-36 w-36 sm:h-40 sm:w-40">
        <span className="text-xl sm:text-2xl font-bold font-headline text-primary animate-pulse">
          TrueLogiX
        </span>
        <div className="stem-emoji s">🔬</div>
        <div className="stem-emoji t">💻</div>
        <div className="stem-emoji e">⚙️</div>
        <div className="stem-emoji m">📈</div>
      </div>
    </div>
  );
}
