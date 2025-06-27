import { LoadingLink as Link } from '@/components/LoadingLink';
import { Logo } from './Logo';
import { Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t bg-card">
      <div className="container grid grid-cols-1 gap-8 py-12 md:grid-cols-12">
        <div className="flex flex-col items-start gap-4 md:col-span-3">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TrueLogiX. All Rights Reserved.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:col-span-6">
          <div>
            <h3 className="mb-4 font-semibold">Navigate</h3>
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
            </nav>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Connect</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                Contact Us
              </Link>
              <Link href="/#make-your-website" className="text-sm text-muted-foreground hover:text-primary">
                Make Your Website
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">More</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/feedback" className="text-sm text-muted-foreground hover:text-primary">
                Student Feedback
              </Link>
              <Link href="/feedback" className="text-sm text-muted-foreground hover:text-primary">
                Client Feedback
              </Link>
            </nav>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 md:col-span-3 md:items-end">
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
