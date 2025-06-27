'use client';

import { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';

const WELCOME_SCREEN_KEY = 'welcomeScreenShown';

const emojis = ['🔬', '💻', '⚙️', '📈'];

export function WelcomeScreen() {
  const [shouldRender, setShouldRender] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [visibleElements, setVisibleElements] = useState({
    logo: false,
    emojis: [false, false, false, false],
    text: false,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasBeenShown = localStorage.getItem(WELCOME_SCREEN_KEY);

      if (hasBeenShown) {
        setShouldRender(false);
        return;
      }

      localStorage.setItem(WELCOME_SCREEN_KEY, 'true');

      const timers: NodeJS.Timeout[] = [];
      const sequence = [
        () => setVisibleElements(p => ({ ...p, logo: true })),
        () => setVisibleElements(p => ({ ...p, emojis: [true, false, false, false] })),
        () => setVisibleElements(p => ({ ...p, emojis: [true, true, false, false] })),
        () => setVisibleElements(p => ({ ...p, emojis: [true, true, true, false] })),
        () => setVisibleElements(p => ({ ...p, emojis: [true, true, true, true] })),
        () => setVisibleElements(p => ({ ...p, text: true })),
        () => setIsFadingOut(true),
        () => setShouldRender(false),
      ];

      const delays = [200, 400, 200, 200, 200, 400, 1900, 1000];
      let cumulativeDelay = 0;

      sequence.forEach((action, index) => {
        cumulativeDelay += delays[index];
        timers.push(setTimeout(action, cumulativeDelay));
      });

      return () => {
        timers.forEach(clearTimeout);
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
      <div className="relative flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center w-48 h-48">
          {/* Logo in the center */}
          {visibleElements.logo && (
            <div className="animate-pop-in">
              <Logo />
            </div>
          )}
          {/* Emojis positioned around the logo */}
          {visibleElements.emojis[0] && <div className="absolute text-4xl -top-2 left-4 animate-pop-in">{emojis[0]}</div>}
          {visibleElements.emojis[1] && <div className="absolute text-4xl top-14 -right-4 animate-pop-in">{emojis[1]}</div>}
          {visibleElements.emojis[2] && <div className="absolute text-4xl -bottom-2 right-4 animate-pop-in">{emojis[2]}</div>}
          {visibleElements.emojis[3] && <div className="absolute text-4xl bottom-14 -left-4 animate-pop-in">{emojis[3]}</div>}
        </div>
        {visibleElements.text && (
          <div className="mt-8 text-center animate-fade-in-down">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
              Welcome to TrueLogiX
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Your journey to innovation starts now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
