import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function ContactUsPage() {
  return (
    <main className="flex-grow container mx-auto p-4 md:p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl text-primary">Contact Us</CardTitle>
          </div>
          <CardDescription>We'd love to hear from you.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            This page will have a contact form or display contact information.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
