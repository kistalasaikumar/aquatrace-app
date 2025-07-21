'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell } from 'recharts';
import { Sparkles, Droplets, Trophy, Medal, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';

interface LeaderboardEntry {
  name: string;
  score: number;
  isCurrentUser: boolean;
}

export interface ResultsData {
  totalFootprint: number;
  footprintBreakdown: {
    name: string;
    value: number;
    fill: string;
  }[];
  tips: string[];
  leaderboard: LeaderboardEntry[];
}

interface ResultsDisplayProps {
  results: ResultsData;
}

const getTrophyIcon = (rank: number) => {
    switch (rank) {
        case 0: return <Trophy className="h-5 w-5 text-yellow-500" />;
        case 1: return <Medal className="h-5 w-5 text-slate-400" />;
        case 2: return <Star className="h-5 w-5 text-yellow-600" />;
        default: return <span className="text-sm font-bold w-5 text-center">{rank + 1}</span>;
    }
}


export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const chartConfig = results.footprintBreakdown.reduce((acc, item) => {
    acc[item.name.toLowerCase()] = { label: item.name };
    return acc;
  }, {} as any);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <Card className="w-full shadow-lg animate-in fade-in-50 duration-500">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Your Water Footprint</CardTitle>
              <CardDescription>Here is a breakdown of your estimated daily virtual water usage.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col items-center justify-center space-y-2">
                 <Droplets className="h-16 w-16 text-primary/70" />
                <p className="text-sm text-muted-foreground">Total Daily Footprint</p>
                <p className="text-4xl lg:text-5xl font-bold text-primary">
                  {results.totalFootprint.toLocaleString()}
                  <span className="text-xl font-medium text-muted-foreground ml-2">gallons</span>
                </p>
              </div>
              <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[250px]">
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={results.footprintBreakdown}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    {results.footprintBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="w-full shadow-lg animate-in fade-in-50 duration-500 delay-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <CardTitle className="font-headline text-2xl text-primary">Personalized Saving Tips</CardTitle>
              </div>
              <CardDescription>Based on your profile, here are some ways you can reduce your footprint.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {results.tips.map((tip, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>Tip #{index + 1}</AccordionTrigger>
                    <AccordionContent className="text-base">
                      {tip}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card className="w-full shadow-lg animate-in fade-in-50 duration-500 delay-400">
             <CardHeader>
                <div className="flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-primary" />
                    <CardTitle className="font-headline text-2xl text-primary">AquaLeaders</CardTitle>
                </div>
                <CardDescription>See how you stack up against other savers!</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <ul className="space-y-3 pr-4">
                    {results.leaderboard.map((user, index) => (
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
