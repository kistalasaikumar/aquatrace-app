import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Info, Droplets, Target, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="flex-grow container mx-auto p-4 md:p-8">
      <Card className="w-full max-w-4xl mx-auto shadow-lg border-primary/20">
        <CardHeader>
            <div className="flex items-center gap-2">
                <Info className="h-6 w-6 text-primary" />
                <CardTitle className="font-headline text-2xl text-primary">About AquaTrace</CardTitle>
            </div>
          <CardDescription>Our mission is to make the invisible visible and empower everyone to conserve our most precious resource: water.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-lg leading-relaxed">
          <p>
            Welcome to <span className="font-bold text-primary">AquaTrace</span>, an organization dedicated to raising awareness about virtual water consumption. Many of us are conscious of the water we use when we turn on a tap, but what about the hidden water embedded in our food, clothing, and everyday products? That's what we call "virtual water," and it makes up the vast majority of our water footprint.
          </p>
          <div className="space-y-4 pt-4 border-t border-border/50">
            <h3 className="flex items-center gap-2 text-xl font-bold text-primary/90"><Target className="h-5 w-5"/> What We Do</h3>
            <p>
                The AquaTrace application is a powerful yet simple tool designed to help you understand and reduce your virtual water footprint. By answering a few questions about your lifestyle, our calculator gives you a personalized estimate of your daily water consumption, broken down into key areas like diet and household use.
            </p>
          </div>
           <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-xl font-bold text-primary/90"><Sparkles className="h-5 w-5"/> More Than a Calculator</h3>
            <p>
                But AquaTrace is more than just a calculator. We provide personalized, actionable tips to help you make meaningful changes. Our "AquaLeaders" leaderboard adds a fun, competitive-spirit to water conservation, encouraging users to challenge themselves and each other to save more.
            </p>
          </div>
           <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-xl font-bold text-primary/90"><Droplets className="h-5 w-5"/> Our Goal</h3>
            <p>
                Our ultimate goal is to foster a global community of water-conscious individuals. By making the invisible water footprint visible, we believe we can inspire collective action to protect our planet's most vital resource for generations to come. Join us on this journey to make every drop count.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
