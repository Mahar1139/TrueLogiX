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
        'pointer-events-none fixed top-0 left-0 z-[999] h-1 w-full transition-opacity duration-300',
        loading ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className="h-full w-full bg-primary animate-pulse" />
    </div>
  );
}
