import Link from 'next/link';
import { Logo } from './Logo';
import { Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t bg-card">
      <div className="container grid grid-cols-1 gap-8 py-12 md:grid-cols-3">
        <div className="flex flex-col items-start gap-4">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TrueLogiX. All Rights Reserved.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="mb-4 font-semibold">Pages</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                Home
              </Link>
              <Link href="/courses" className="text-sm text-muted-foreground hover:text-primary">
                Courses
              </Link>
              <Link href="/events" className="text-sm text-muted-foreground hover:text-primary">
                Events
              </Link>
              <Link href="/feedback" className="text-sm text-muted-foreground hover:text-primary">
                Feedback
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Connect</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/#make-your-website" className="text-sm text-muted-foreground hover:text-primary">
                Make Your Website
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <h3 className="font-semibold">Follow Us</h3>
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
