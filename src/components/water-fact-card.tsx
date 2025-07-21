'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { Button } from './ui/button';

const waterFacts = [
  "It takes about 2,500 gallons of water to produce one pound of beef.",
  "A single cotton t-shirt can require up to 700 gallons of water to produce.",
  "Producing one pound of plastic takes around 22 gallons of water.",
  "A cup of coffee requires about 37 gallons of water to produce, from bean to cup.",
  "It takes roughly 1,000 gallons of water to produce 1 gallon of milk.",
  "A single apple takes about 18 gallons of water to grow.",
  "Manufacturing a new smartphone consumes about 3,190 gallons of water.",
  "A pound of chocolate needs around 3,170 gallons of water to produce.",
  "Fixing a leaky faucet can save up to 3,000 gallons of water per year."
];


export function WaterFactCard() {
  const [fact, setFact] = useState('');

  const showNewFact = () => {
    const randomIndex = Math.floor(Math.random() * waterFacts.length);
    let newFact = waterFacts[randomIndex];
    // Ensure we get a new fact if possible
    if (waterFacts.length > 1) {
        while (newFact === fact) {
            const newIndex = Math.floor(Math.random() * waterFacts.length);
            newFact = waterFacts[newIndex];
        }
    }
    setFact(newFact);
  }

  useEffect(() => {
    showNewFact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="shadow-lg bg-accent/50 sticky top-8">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Lightbulb className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-xl">Did You Know?</CardTitle>
        </div>
        <CardDescription>Quick facts about virtual water.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg italic text-foreground/80">
          {fact || "Loading fact..."}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" onClick={showNewFact}>Show another fact</Button>
      </CardFooter>
    </Card>
  );
}
