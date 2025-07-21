import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'AquaTrace: Virtual Water Tracker',
  description: 'An interactive web application to calculate and understand your virtual water consumption.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
          <Header />
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
