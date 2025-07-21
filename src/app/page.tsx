'use client';

import { useState } from 'react';
import type { ExtendedWaterFootprintAnalysisInput, WaterSavingTipsOutput } from '@/ai/flows/generate-water-saving-tips';
import { getWaterSavingTipsAction } from '@/app/actions';
import { ResultsDisplay, type ResultsData } from '@/components/results-display';
import { Droplets } from 'lucide-react';
import { MultiStepQuestionnaire } from '@/components/multi-step-questionnaire';

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
        'vegan': 300,
        'vegetarian': 400,
        'meat eater': 600,
      };
      const dietWater = dietWaterMap[data.dietType.toLowerCase()] || 500;
      
      const householdWater = data.showerTime * 2.5 * data.householdSize + data.laundryFrequency * 30;
      const outdoorWater = data.outdoorWatering.toLowerCase().includes('daily') ? 150 : (data.outdoorWatering.toLowerCase().includes('never') ? 0 : 75);
      const totalFootprint = Math.round(dietWater + householdWater + outdoorWater);

      const getAquaPoints = (footprint: number) => {
          return Math.max(0, Math.round(10000 - footprint * 5));
      }
      
      const calculatedResults: ResultsData = {
        totalFootprint,
        footprintBreakdown: [
          { name: 'Food', value: dietWater, fill: 'hsl(var(--chart-3))' },
          { name: 'Household', value: householdWater, fill: 'hsl(var(--chart-1))' },
          { name: 'Outdoor', value: outdoorWater, fill: 'hsl(var(--chart-2))' },
        ],
        tips: tipsOutput.tips,
        leaderboard: [
            { name: data.userName, score: getAquaPoints(totalFootprint), isCurrentUser: true },
            { name: 'EcoWarrior', score: 8200, isCurrentUser: false },
            { name: 'HydroHelper', score: 7500, isCurrentUser: false },
            { name: 'AquaSaver', score: 6800, isCurrentUser: false },
            { name: 'WaterWise', score: 6100, isCurrentUser: false },
        ].sort((a,b) => b.score - a.score),
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
      <main className="flex-grow container mx-auto p-4 md:p-8 flex items-center justify-center">
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
