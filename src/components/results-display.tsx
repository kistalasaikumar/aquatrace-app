
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell } from 'recharts';
import { Sparkles, Droplets, Trophy } from 'lucide-react';
import type { LeaderboardEntry } from './leaderboard';
import { Leaderboard } from './leaderboard';


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
              <ul className="space-y-4">
                {results.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-base">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
           <Card className="w-full shadow-lg animate-in fade-in-50 duration-500 delay-400">
             <CardHeader>
                <div className="flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-primary" />
                    <CardTitle className="font-headline text-2xl text-primary">Your Standing</CardTitle>
                </div>
                <CardDescription>This is your position on the leaderboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <Leaderboard leaderboard={results.leaderboard} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
