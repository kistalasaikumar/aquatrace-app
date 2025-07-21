import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Droplets } from "lucide-react";

export default function VirtualWaterPage() {
  return (
    <main className="flex-grow container mx-auto p-4 md:p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Droplets className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl text-primary">Virtual Water</CardTitle>
          </div>
          <CardDescription>Understanding the hidden water in everyday products.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            This page will explain the concept of virtual water and its importance.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
