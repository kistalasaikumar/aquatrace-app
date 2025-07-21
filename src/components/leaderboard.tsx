'use client';

import { Trophy, Medal, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';

export interface LeaderboardEntry {
  name: string;
  score: number;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
    leaderboard: LeaderboardEntry[];
}

const getTrophyIcon = (rank: number) => {
    switch (rank) {
        case 0: return <Trophy className="h-5 w-5 text-yellow-500" />;
        case 1: return <Medal className="h-5 w-5 text-slate-400" />;
        case 2: return <Star className="h-5 w-5 text-yellow-600" />;
        default: return <span className="text-sm font-bold w-5 text-center">{rank + 1}</span>;
    }
}

export function Leaderboard({ leaderboard }: LeaderboardProps) {
    return (
        <ScrollArea className="h-60 md:h-96">
            <ul className="space-y-3 pr-4">
                {leaderboard.map((user, index) => (
                    <li key={`${user.name}-${index}`} className={cn(
                        "flex items-center p-3 rounded-lg",
                        user.isCurrentUser ? "bg-primary/10 border-2 border-primary" : "bg-muted/50"
                    )}>
                        <div className="flex items-center justify-center w-8 mr-3">
                            {getTrophyIcon(index)}
                        </div>
                        <Avatar className="h-9 w-9 mr-3">
                            <AvatarFallback className={cn(user.isCurrentUser ? "bg-primary/20" : "")}>
                                {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                            <p className={cn(
                                "font-semibold",
                                user.isCurrentUser && "text-primary"
                            )}>{user.name}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-lg text-primary">{user.score.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Aqua Points</p>
                        </div>
                    </li>
                ))}
            </ul>
        </ScrollArea>
    );
}
