
'use client';

import { useEffect, useState } from 'react';
import type { LeaderboardEntry } from '@/services/leaderboardService';
import { getLeaderboard } from '@/services/leaderboardService';
import { Leaderboard } from '@/components/leaderboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Loader2 } from 'lucide-react';

export default function LeaderboardPage() {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const data = await getLeaderboard();
                setLeaderboard(data);
            } catch (error) {
                console.error("Failed to fetch leaderboard", error);
            } finally {
                setLoading(false);
            }
        }
        fetchLeaderboard();
    }, []);

    return (
        <main className="flex-grow container mx-auto p-4 md:p-8 flex justify-center">
            <Card className="w-full max-w-2xl shadow-lg border-primary/20">
                <CardHeader>
                    <div className="flex items-center gap-2 justify-center">
                        <Trophy className="h-8 w-8 text-primary" />
                        <CardTitle className="font-headline text-3xl text-primary">AquaLeaders</CardTitle>
                    </div>
                    <CardDescription className="text-center">See how you stack up against other water savers!</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center items-center h-96">
                             <Loader2 className="h-16 w-16 animate-spin text-primary" />
                        </div>
                    ) : (
                        <Leaderboard leaderboard={leaderboard} />
                    )}
                </CardContent>
            </Card>
        </main>
    );
}
