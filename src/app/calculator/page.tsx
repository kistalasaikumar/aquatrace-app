'use client';

import { useState } from 'react';
import type { ExtendedWaterFootprintAnalysisInput, WaterSavingTipsOutput } from '@/ai/flows/generate-water-saving-tips';
import { getWaterSavingTipsAction } from '@/app/actions';
import { ResultsDisplay, type ResultsData, type BadgeInfo } from '@/components/results-display';
import { Droplets } from 'lucide-react';
import { MultiStepQuestionnaire } from '@/components/multi-step-questionnaire';
import { addScore, getLeaderboard } from '@/services/leaderboardService';
import type { LeaderboardEntry } from '@/services/leaderboardService';

export default function AquaTracePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ResultsData | null>(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(true);

  const handleCalculate = async (data: ExtendedWaterFootprintAnalysisInput) => {
    setLoading(true);
    setError(null);
    setShowQuestionnaire(false);

    try {
      const tipsOutput: WaterSavingTipsOutput = await getWaterSavingTipsAction(data);
      
      const dietWaterMap: {[key: string]: number} = {
        'vegan': 1135, // 300 gallons
        'vegetarian': 1514, // 400 gallons
        'meat eater': 2271, // 600 gallons
      };
      const dietWater = dietWaterMap[data.dietType.toLowerCase()] || 1893;
      
      // shower: 2.5 gal/min -> 9.46 l/min. laundry: 30 gal/load -> 113.5 l/load
      const householdWater = data.showerTime * 9.46 * data.householdSize + data.laundryFrequency * 113.5;
      // daily: 150gal -> 568l, other: 75gal -> 284l
      const outdoorWater = data.outdoorWatering.toLowerCase().includes('daily') ? 568 : (data.outdoorWatering.toLowerCase().includes('never') ? 0 : 284);
      const totalFootprint = Math.round(dietWater + householdWater + outdoorWater);

      const getAquaPoints = (footprint: number) => {
          // Adjusted for liters. Original was 10000 - footprint_gal * 5
          // New is 10000 - (footprint_liters / 3.785) * 5
          return Math.max(0, Math.round(10000 - (totalFootprint / 3.785) * 5));
      }
      
      const currentUserScore = getAquaPoints(totalFootprint);

      // Add score to our "database"
      await addScore({ name: data.userName, score: currentUserScore });

      // Get updated leaderboard
      const updatedLeaderboard = await getLeaderboard();
      
      // Badge logic
      const badges: BadgeInfo[] = [];
      if (totalFootprint < 2000) {
        badges.push({ name: 'Aqua Saver', description: 'Your total water usage is impressively low!' });
      }
      if (data.dietType === 'Vegetarian' || data.dietType === 'Vegan') {
          badges.push({ name: 'Plant-Forward', description: 'Choosing a plant-based diet saves a lot of water.' });
      }
      // This is a simplified check based on the questionnaire data.
      // We can infer the toilet type from the `outdoorWatering` field where we stored it.
      // A better approach would be to pass the full form data.
      // For now, let's assume we can't get it perfectly.
      // A more robust way: pass `data.showerType` and `data.toiletType` into `getWaterSavingTipsAction` and calculate there.
      // Let's create a placeholder badge for now.
      if (data.showerTime < 8) {
         badges.push({ name: 'Quick Shower', description: 'You save water with short showers.' });
      }


      const calculatedResults: ResultsData = {
        totalFootprint,
        footprintBreakdown: [
          { name: 'Food', value: dietWater, fill: 'hsl(var(--chart-3))' },
          { name: 'Household', value: householdWater, fill: 'hsl(var(--chart-1))' },
          { name: 'Outdoor', value: outdoorWater, fill: 'hsl(var(--chart-2))' },
        ],
        tips: tipsOutput.tips,
        leaderboard: updatedLeaderboard.map(entry => ({
            ...entry,
            isCurrentUser: entry.name.toLowerCase() === data.userName.toLowerCase()
        })),
        badges,
      };

      setResults(calculatedResults);
    } catch (e) {
      console.error(e);
      setError('Sorry, we couldn\'t generate your tips. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
         {showQuestionnaire && <MultiStepQuestionnaire onSubmit={handleCalculate} isLoading={loading} />}
         {loading && !results && (
            <div className="flex flex-col items-center gap-4">
              <Droplets className="h-16 w-16 text-primary animate-pulse" />
              <p className="text-xl text-muted-foreground">Calculating your footprint...</p>
            </div>
         )}
         {error && <div className="text-destructive text-center p-4 rounded-md bg-destructive/10">{error}</div>}
         {results && !loading && <ResultsDisplay results={results} />}
      </main>

       <footer className="text-center py-6 px-4 md:px-8 mt-auto border-t border-border/50 text-muted-foreground text-sm">
        <p>AquaTrace: Making the invisible visible.</p>
      </footer>
    </>
  );
}
