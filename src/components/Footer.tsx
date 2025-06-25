import Link from 'next/link';
import { Logo } from './Logo';
import { Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t bg-card">
      <div className="container flex flex-col items-center justify-between gap-6 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
           <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} TrueLogiX. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Facebook" className="text-muted-foreground transition-colors hover:text-primary">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Instagram" className="text-muted-foreground transition-colors hover:text-primary">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
