
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
    { name: 'A T-Shirt', icon: Shirt, query: 'a t-shirt' },
    { name: 'An Apple', icon: Apple, query: '1 apple' },
    { name: 'An Avocado', icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11.78 21.84a2.9 2.9 0 0 1-4.06-4.06l6.83-6.83a2.9 2.9 0 0 1 4.06 4.06L11.78 21.84Z"/><path d="M12.5 12.5a2.12 2.12 0 1 0-3-3 2.12 2.12 0 0 0 3 3Z"/><path d="M17.65 17.65 22 22"/></svg> , query: 'an avocado' },
    { name: 'A Cup of Coffee', icon: CupSoda, query: 'a cup of coffee' },
    { name: 'A Tomato', icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.39 18.33a4.33 4.33 0 1 0-6.12-2.45"/><path d="M13.5 2.5c0 2.48-2.02 4.5-4.5 4.5S4.5 4.98 4.5 2.5"/><path d="M8.33 2.67a6.34 6.34 0 0 0-4.66 4.66"/><path d="M14.63 15.34a2.47 2.47 0 1 1-3.49-3.49 2.47 2.47 0 0 1 3.49 3.49Z"/></svg>, query: 'a tomato' },
];

export default function ARVisualizerPage() {
  const [query, setQuery] = useState('a t-shirt');
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
    "t-shirt": "https://sketchfab.com/models/4d8b8ac18e224e29b46f5a34138a8e31/embed?camera=0&autostart=1",
    "apple": "https://sketchfab.com/models/2f7a935aa8334861b0d2d31295321f42/embed?camera=0&autostart=1",
    "avocado": "https://sketchfab.com/models/a1e6cf793a5b4b1b9e82937000d6e6a1/embed?camera=0&autostart=1",
    "cup of coffee": "https://sketchfab.com/models/2704103551524e9b98a002872337b822/embed?camera=0&autostart=1",
    "tomato": "https://sketchfab.com/models/a6a6f4e6454c4146a81b1c676940e34c/embed?camera=0&autostart=1",
    "burger": "https://sketchfab.com/models/864db5582f3c44a2b95111005b630018/embed?camera=0&autostart=1",
    "jeans": "https://sketchfab.com/models/a9e7011d61134a788c0b55513511f2c2/embed?camera=0&autostart=1",
    "orange": "https://sketchfab.com/models/65735f4b55364448939c65697241ffd2/embed?camera=0&autostart=1",
    "banana": "https://sketchfab.com/models/437e403d6e5a47e3a0a3835f5c531d2e/embed?camera=0&autostart=1",
    "slice of bread": "https://sketchfab.com/models/3c051515e3474a589a8a728b9d3e8e19/embed?camera=0&autostart=1",
    "egg": "https://sketchfab.com/models/13c1c73a45c747979927ef0f6f0282a5/embed?camera=0&autostart=1",
    "cheese": "https://sketchfab.com/models/e7a177259e824c3298c471a8a25c3174/embed?camera=0&autostart=1",
    "chicken meat": "https://sketchfab.com/models/97b314e397f34149b5c2182e66698188/embed?camera=0&autostart=1",
    "potato": "https://sketchfab.com/models/86043429dd114a8ca463e236528d116b/embed?camera=0&autostart=1",
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
                  <div style={{ width: '100%', height: '400px' }}>
                    <iframe
                        title={result.item}
                        allowFullScreen
                        allow="autoplay; fullscreen; xr-spatial-tracking"
                        src={getModelUrl(result.item)}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                    ></iframe>
                  </div>
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

    