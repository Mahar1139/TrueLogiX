'use client';

import { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';

const WELCOME_SCREEN_KEY = 'welcomeScreenShown';

export function WelcomeScreen() {
  const [shouldRender, setShouldRender] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasBeenShown = sessionStorage.getItem(WELCOME_SCREEN_KEY);

      if (hasBeenShown) {
        setShouldRender(false);
        return;
      }

      sessionStorage.setItem(WELCOME_SCREEN_KEY, 'true');

      const fadeOutTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 2500); // Visible for 2.5s

      const unmountTimer = setTimeout(() => {
        setShouldRender(false);
      }, 3500); // 2.5s + 1s fade-out

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(unmountTimer);
      };
    }
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-background transition-opacity duration-1000',
        isFadingOut ? 'opacity-0' : 'opacity-100'
      )}
    >
      <div className="text-center animate-fade-in-down">
        <div className="inline-block mb-8">
          <Logo />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
          Welcome
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your journey to innovation starts now.
        </p>
      </div>
    </div>
  );
}
