
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Search, Droplets } from 'lucide-react';
import type { ARVisualizerOutput } from '@/ai/flows/ar-visualizer-schema';
import { visualizeWaterFootprint } from '@/ai/flows/ar-visualizer-flow';
import { ModelViewer } from '@/components/model-viewer';

export default function ARVisualizerPage() {
  const [query, setQuery] = useState('1 burger');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ARVisualizerOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const output = await visualizeWaterFootprint({ query });
      setResult(output);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const itemToModelMap: Record<string, string> = {
    "burger": "https://cdn.glitch.global/e549a996-7a71-4475-b651-4560d21a56f0/burger.glb?v=1722450001046",
    "apple": "https://cdn.glitch.global/e549a996-7a71-4475-b651-4560d21a56f0/apple.glb?v=1722449758712",
    "avocado": "https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/Avocado/glTF/Avocado.gltf",
    "tomato": "https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/Tomato/glTF/Tomato.gltf",
    "potato": "https://cdn.glitch.global/e549a996-7a71-4475-b651-4560d21a56f0/potato.glb?v=1722449740921",
    "t-shirt": "https://cdn.glitch.global/e549a996-7a71-4475-b651-4560d21a56f0/t-shirt.glb?v=1722449910434",
    "jeans": "https://cdn.glitch.global/e549a996-7a71-4475-b651-4560d21a56f0/jeans.glb?v=1722449900450",
    "orange": "https://cdn.glitch.global/e549a996-7a71-4475-b651-4560d21a56f0/orange.glb?v=1722449764585",
    "banana": "https://cdn.glitch.global/e549a996-7a71-4475-b651-4560d21a56f0/banana.glb?v=1722449752341",
    "slice of bread": "https://cdn.glitch.global/e549a996-7a71-4475-b651-4560d21a56f0/bread.glb?v=1722449733988",
    "egg": "https://cdn.glitch.global/e549a996-7a71-4475-b651-4560d21a56f0/egg.glb?v=1722449727503"
  }

  const getModelUrl = (item: string) => {
      return itemToModelMap[item.toLowerCase()] || "https://modelviewer.dev/shared-assets/models/WaterBottle.glb";
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
            Type in an item to see its virtual water footprint come to life. Try "a t-shirt" or "5 apples".
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                    <p>Enter an item above to visualize its water footprint.</p>
                    <p className="text-sm mt-2">(On mobile, you can tap the AR button to see it in your room!)</p>
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
                    itemScale={result.quantity}
                    alt={`3D model of ${result.item}`}
                  />
                  <h3 className="text-2xl font-bold mt-4">{result.totalWater.toLocaleString()} Liters</h3>
                  <p className="text-muted-foreground">{result.explanation}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

    