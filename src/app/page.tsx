'use client';

import { Button } from '@/components/ui/button';
import { Droplets } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
    const router = useRouter();

    return (
        <>
            <main className="flex-grow flex flex-col">
                <div className="relative h-[calc(100vh-80px)] w-full flex items-center justify-center">
                    <Image
                        src="https://placehold.co/1920x1080"
                        alt="Water drop"
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0 z-0 opacity-20"
                        data-ai-hint="water drop"
                    />
                    <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
                        <Droplets className="h-24 w-24 text-primary mb-4" />
                        <h1 className="text-5xl md:text-7xl font-bold text-primary tracking-tight">
                            AquaTrace
                        </h1>
                        <p className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground">
                            Discover your virtual water footprint. Understand your impact.
                            <br />
                            Conserve our most precious resource.
                        </p>
                        <Link href="/calculator" passHref>
                             <Button size="lg" className="mt-8 text-lg">
                                Calculate Your Virtual Water
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="text-center py-6 px-4 md:px-8 border-t border-border/50 text-muted-foreground text-sm">
                <p>AquaTrace: Making the invisible visible.</p>
            </footer>
        </>
    );
}
