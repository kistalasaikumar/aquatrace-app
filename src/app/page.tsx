'use client';

import { useState } from 'react';
import type { WaterFootprintAnalysisInput, WaterSavingTipsOutput } from '@/ai/flows/generate-water-saving-tips';
import { getWaterSavingTipsAction } from '@/app/actions';
import { QuestionnaireForm } from '@/components/questionnaire-form';
import { ResultsDisplay, type ResultsData } from '@/components/results-display';
import { WaterFactCard } from '@/components/water-fact-card';
import { Droplets } from 'lucide-react';

export default function AquaTracePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ResultsData | null>(null);

  const handleCalculate = async (data: WaterFootprintAnalysisInput) => {
    setLoading(true);
    setError(null);

    try {
      const tipsOutput: WaterSavingTipsOutput = await getWaterSavingTipsAction(data);
      
      // Dummy calculation for water footprint
      const dietWater = {
        'vegan': 300,
        'vegetarian': 400,
        'omnivore': 600,
      }[data.dietType.toLowerCase()] || 500;
      
      const householdWater = data.showerTime * 2.5 * data.householdSize + data.laundryFrequency * 30;
      const outdoorWater = data.outdoorWatering.toLowerCase().includes('daily') ? 150 : (data.outdoorWatering.toLowerCase().includes('never') ? 0 : 75);
      const totalFootprint = Math.round(dietWater + householdWater + outdoorWater);
      
      const calculatedResults: ResultsData = {
        totalFootprint,
        footprintBreakdown: [
          { name: 'Food', value: dietWater, fill: 'hsl(var(--chart-3))' },
          { name: 'Household', value: householdWater, fill: 'hsl(var(--chart-1))' },
          { name: 'Outdoor', value: outdoorWater, fill: 'hsl(var(--chart-2))' },
        ],
        tips: tipsOutput.tips,
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
    <div className="min-h-screen w-full bg-background text-foreground">
      <header className="py-6 px-4 md:px-8 border-b border-border/50">
        <div className="container mx-auto flex items-center gap-3">
          <Droplets className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary-dark font-headline">
              AquaTrace
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Discover your virtual water footprint.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <QuestionnaireForm onSubmit={handleCalculate} isLoading={loading} />
            {error && <div className="text-destructive text-center p-4 rounded-md bg-destructive/10">{error}</div>}
            {results && <ResultsDisplay results={results} />}
          </div>
          <div className="lg:col-span-1">
            <WaterFactCard />
          </div>
        </div>
      </main>

       <footer className="text-center py-6 px-4 md:px-8 mt-8 border-t border-border/50 text-muted-foreground text-sm">
        <p>AquaTrace: Making the invisible visible.</p>
      </footer>
    </div>
  );
}
