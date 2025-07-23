
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Search, Droplets, Smartphone } from 'lucide-react';
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
    "burger": "https://sketchfab.com/models/06c53046a0a84e688c224b136894b595/embed?autostart=1&preload=1&ui_theme=dark",
    "apple": "https://sketchfab.com/models/241d7355b25243179532aad9a7def95b/embed?autostart=1&preload=1&ui_theme=dark",
    "avocado": "https://sketchfab.com/models/b3399a91244242e78746c07149a46452/embed?autostart=1&preload=1&ui_theme=dark",
    "tomato": "https://sketchfab.com/models/30a54e17e0894e63989c45053b91a27f/embed?autostart=1&preload=1&ui_theme=dark",
    "potato": "https://sketchfab.com/models/f527b3b5a7614e599b867e415309c855/embed?autostart=1&preload=1&ui_theme=dark",
    "t-shirt": "https://sketchfab.com/models/120531289133458ca6c5b9658b0933f2/embed?autostart=1&preload=1&ui_theme=dark",
    "jeans": "https://sketchfab.com/models/f7203b60f16e431cadf8b5357801a41e/embed?autostart=1&preload=1&ui_theme=dark",
    "orange": "https://sketchfab.com/models/3ab7ab3f344f419b9d80196ac56dfc40/embed?autostart=1&preload=1&ui_theme=dark",
    "banana": "https://sketchfab.com/models/6b36070a72c14828b185361327117184/embed?autostart=1&preload=1&ui_theme=dark",
    "slice of bread": "https://sketchfab.com/models/19396e6a8d6745f487405eba0313a5e8/embed?autostart=1&preload=1&ui_theme=dark",
    "egg": "https://sketchfab.com/models/018e690a61c348f9a56588a41b2c4e23/embed?autostart=1&preload=1&ui_theme=dark",
    "cheese": "https://sketchfab.com/models/e40ff580132b43b8908f0a454d4b1b9e/embed?autostart=1&preload=1&ui_theme=dark",
    "chicken meat": "https://sketchfab.com/models/4d0a1b80c51944589f41de5132a26514/embed?autostart=1&preload=1&ui_theme=dark",
    "cup of coffee": "https://sketchfab.com/models/a5113d098e944b6e8d1234907a75d55a/embed?autostart=1&preload=1&ui_theme=dark"
  };

  const getModelUrl = (item: string) => {
      return itemToModelMap[item.toLowerCase()] || "https://sketchfab.com/models/06c53046a0a84e688c224b136894b595/embed?autostart=1&preload=1&ui_theme=dark";
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
                  <iframe 
                    src={getModelUrl(result.item)}
                    title={result.item}
                    allow="autoplay; fullscreen; vr"
                    allowFullScreen
                    style={{width: '100%', height: '400px', border: 0}}
                  ></iframe>
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

    