
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Search, Droplets, Smartphone, CupSoda, Shirt, Apple, Beef } from 'lucide-react';
import type { ARVisualizerOutput } from '@/ai/flows/ar-visualizer-schema';
import { visualizeWaterFootprint } from '@/ai/flows/ar-visualizer-flow';
import { ModelViewer } from '@/components/model-viewer';

const presetItems = [
    { name: '1 burger', icon: Beef, query: '1 burger' },
    { name: '1 apple', icon: Apple, query: '1 apple' },
    { name: 'A T-Shirt', icon: Shirt, query: 'a t-shirt' },
    { name: 'A Cup of Coffee', icon: CupSoda, query: 'a cup of coffee' },
    { name: 'A pair of Jeans', icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 22h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2"/><path d="M12 14V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v10"/><path d="M6 14h2a2 2 0 0 0 2-2V4"/></svg> , query: '1 pair of jeans' },
];

export default function ARVisualizerPage() {
  const [query, setQuery] = useState('1 burger');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ARVisualizerOutput | null>(null);

  const runVisualization = async (queryString: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setQuery(queryString);

    try {
      const output = await visualizeWaterFootprint({ query: queryString });
      setResult(output);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await runVisualization(query);
  };

  const handlePresetClick = async (presetQuery: string) => {
    await runVisualization(presetQuery);
  }

  const itemToModelMap: Record<string, string> = {
    "burger": "https://storage.googleapis.com/fdo-assets/aquatrace/burger.glb",
    "apple": "https://storage.googleapis.com/fdo-assets/aquatrace/apple.glb",
    "avocado": "https://modelviewer.dev/shared-assets/models/Avocado.glb",
    "tomato": "https://modelviewer.dev/shared-assets/models/tomato.glb",
    "potato": "https://storage.googleapis.com/fdo-assets/aquatrace/potato.glb",
    "t-shirt": "https://storage.googleapis.com/fdo-assets/aquatrace/t-shirt.glb",
    "jeans": "https://storage.googleapis.com/fdo-assets/aquatrace/jeans.glb",
    "orange": "https://storage.googleapis.com/fdo-assets/aquatrace/orange.glb",
    "banana": "https://storage.googleapis.com/fdo-assets/aquatrace/banana.glb",
    "slice of bread": "https://storage.googleapis.com/fdo-assets/aquatrace/bread.glb",
    "egg": "https://storage.googleapis.com/fdo-assets/aquatrace/egg.glb",
    "cheese": "https://storage.googleapis.com/fdo-assets/aquatrace/cheese.glb",
    "chicken meat": "https://storage.googleapis.com/fdo-assets/aquatrace/chicken.glb",
    "cup of coffee": "https://storage.googleapis.com/fdo-assets/aquatrace/coffee_cup.glb"
  };

  const getModelUrl = (item: string) => {
      return itemToModelMap[item.toLowerCase()] || "https://modelviewer.dev/shared-assets/models/Astronaut.glb";
  }

  return (
    <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
      <Card className="w-full max-w-4xl shadow-lg border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Droplets className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl text-primary">AR Water Visualizer</CardTitle>
          </div>
          <CardDescription>
            Type in an item or select a preset to see its virtual water footprint come to life.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Or try one of these:</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {presetItems.map((item) => (
                      <Button key={item.name} variant="outline" onClick={() => handlePresetClick(item.query)} disabled={loading} className="flex flex-col h-auto py-3 gap-2 items-center justify-center">
                          <item.icon />
                          <span className="text-center text-xs">{item.name}</span>
                      </Button>
                  ))}
              </div>
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-8">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., show water for 3 burgers"
              className="flex-grow"
              disabled={loading}
              suppressHydrationWarning
            />
            <Button type="submit" disabled={loading} suppressHydrationWarning>
              {loading ? <Loader2 className="animate-spin" /> : <Search />}
              <span className="ml-2 hidden md:inline">Visualize</span>
            </Button>
          </form>

          {error && <p className="text-destructive text-center">{error}</p>}
          
          <div className="min-h-[450px] w-full bg-muted/50 rounded-lg flex items-center justify-center p-4">
            {!result && !loading && (
                <div className="text-center text-muted-foreground">
                    <Droplets size={48} className="mx-auto mb-4"/>
                    <p>Enter an item above or select a preset to visualize its water footprint.</p>
                </div>
            )}
             {loading && (
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                    <p>Analyzing and fetching 3D models...</p>
                </div>
            )}
            {result && (
              <div className="w-full h-full flex flex-col items-center justify-center text-center animate-in fade-in-50 duration-500">
                  <ModelViewer 
                    src={getModelUrl(result.item)}
                    alt={result.item}
                  />
                  <h3 className="text-2xl font-bold mt-4">{result.totalWater.toLocaleString()} Liters</h3>
                  <p className="text-muted-foreground">{result.explanation}</p>
                   <div className="mt-4 flex items-center gap-2 rounded-md bg-accent p-3 text-sm text-accent-foreground">
                    <Smartphone size={24} />
                    <span>On a mobile device? Tap the AR icon in the bottom-right of the viewer to see this in your room!</span>
                  </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
