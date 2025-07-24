
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Droplets, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/virtual-water', label: 'Virtual Water' },
  { href: '/ar-visualizer', label: 'AR Visualizer' },
  { href: '/about', label: 'About' },
  { href: '/contact-us', label: 'Contact Us' },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const NavLink = ({ href, label, className }: { href: string; label: string, className?: string }) => (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        onClick={() => setMenuOpen(false)}
        className={cn(
            'justify-start text-base',
            pathname === href
            ? 'text-primary font-bold hover:text-primary'
            : 'text-muted-foreground',
            className
        )}
        suppressHydrationWarning
      >
        {label}
      </Button>
    </Link>
  );

  return (
    <header className="py-4 px-4 md:px-8 border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-sm z-20">
      <div className="container mx-auto flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Droplets className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary font-headline">
              AquaTrace
            </h1>
            <p className="hidden sm:block text-sm md:text-base text-muted-foreground">
              Discover your virtual water footprint.
            </p>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
            {navLinks.map(link => <NavLink key={link.href} {...link} />)}
        </nav>
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="p-4">
                 <div className="flex justify-between items-center mb-8">
                     <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                        <Droplets className="h-7 w-7 text-primary" />
                        <span className="text-xl font-bold text-primary">AquaTrace</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}>
                        <X className="h-6 w-6" />
                    </Button>
                 </div>
                <nav className="flex flex-col gap-4">
                  {navLinks.map(link => <NavLink key={link.href} {...link} />)}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
