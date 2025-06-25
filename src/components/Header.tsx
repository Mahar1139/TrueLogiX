'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/events', label: 'Events' },
  { href: '/feedback', label: 'Feedback' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col p-4">
                <Logo />
                <nav className="mt-8 flex flex-col gap-4">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        'text-lg font-medium',
                        pathname === href ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                      )}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
             {/* Could add a search bar here in the future */}
          </div>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'font-medium transition-colors',
                  pathname === href ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="ml-4 md:hidden">
          <Logo />
        </div>
      </div>
    </header>
  );
}
