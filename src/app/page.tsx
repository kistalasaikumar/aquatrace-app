
'use client';

import { Button } from '@/components/ui/button';
import { Droplets, Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { LeaderboardEntry } from '@/services/leaderboardService';
import { getLeaderboard } from '@/services/leaderboardService';
import { Leaderboard } from '@/components/leaderboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LandingPage() {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                // Fetch only top 5 for the landing page
                const data = await getLeaderboard();
                setLeaderboard(data.slice(0, 5));
            } catch (error) {
                console.error("Failed to fetch leaderboard", error);
            } finally {
                setLoading(false);
            }
        }
        fetchLeaderboard();
    }, []);

    return (
        <>
            <main className="flex-grow flex flex-col">
                <div className="relative min-h-[calc(100vh-80px)] w-full flex items-center justify-center py-12">
                    <Image
                        src="https://placehold.co/1920x1080"
                        alt="Water drop"
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0 z-0 opacity-20"
                        data-ai-hint="water drops"
                    />
                    <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 gap-8">
                        <div className="flex flex-col items-center justify-center text-center">
                            <Droplets className="h-24 w-24 text-primary mb-4" />
                            <h1 className="text-5xl md:text-7xl font-bold text-primary tracking-tight">
                                AquaTrace
                            </h1>
                            <p className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground">
                                Discover your virtual water footprint. Understand your impact.
                                <br />
                                Conserve our most precious resource.
                            </p>
                        </div>
                        
                        <div className="flex flex-col items-center gap-4 w-full max-w-md">
                            <Link href="/calculator" passHref>
                                <Button size="lg" className="text-lg">
                                    Calculate Your Virtual Water
                                </Button>
                            </Link>

                            {leaderboard.length > 0 && (
                                <Card className="w-full shadow-lg animate-in fade-in-50 duration-500">
                                    <CardHeader>
                                        <div className="flex items-center gap-2 justify-center">
                                            <Trophy className="h-6 w-6 text-primary" />
                                            <CardTitle className="font-headline text-2xl text-primary">Top AquaLeaders</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <Leaderboard leaderboard={leaderboard} />
                                        <Link href="/leaderboard" passHref>
                                            <Button variant="link" className="w-full mt-4">View full leaderboard</Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="text-center py-6 px-4 md:px-8 border-t border-border/50 text-muted-foreground text-sm">
                <p>AquaTrace: Making the invisible visible.</p>
            </footer>
        </>
    );
}
