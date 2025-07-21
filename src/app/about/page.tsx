import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="flex-grow container mx-auto p-4 md:p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
            <div className="flex items-center gap-2">
                <Info className="h-6 w-6 text-primary" />
                <CardTitle className="font-headline text-2xl text-primary">About AquaTrace</CardTitle>
            </div>
          <CardDescription>Learn more about our mission and application.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            This page will contain information about the AquaTrace application, its purpose, and the team behind it.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
