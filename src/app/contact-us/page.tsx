'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, MapPin, Phone, Facebook, Instagram } from "lucide-react";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const contactMethods = [
  {
    name: 'Address',
    icon: MapPin,
    content: 'AquaTrace, 401, Kachiguda X roads, Kachiguda-Hyderabad-500027',
  },
  {
    name: 'Email',
    icon: Mail,
    content: 'saikumar.kistala@gmail.com',
    href: 'mailto:saikumar.kistala@gmail.com'
  },
  {
    name: 'Phone',
    icon: Phone,
    content: '9704725059',
    href: 'tel:9704725059'
  },
  {
    name: 'Facebook',
    icon: Facebook,
    content: 'Coming Soon!',
    href: '#'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    content: 'Coming Soon!',
    href: '#'
  },
];

export default function ContactUsPage() {
  const [selectedContact, setSelectedContact] = useState<string | null>('Address');

  const getContactInfo = () => {
    return contactMethods.find(method => method.name === selectedContact);
  }

  return (
    <main className="flex-grow container mx-auto p-4 md:p-8 flex items-center justify-center">
      <Card className="w-full max-w-2xl mx-auto shadow-lg border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl text-primary pt-2">Contact Us</CardTitle>
          <CardDescription>We'd love to hear from you. Get in touch with us through any of the methods below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            <div className="flex justify-center gap-4 md:gap-8 pt-4 border-t border-border/50">
                {contactMethods.map((method) => (
                    <Button 
                        key={method.name} 
                        variant="outline"
                        size="icon"
                        className={cn(
                            "h-16 w-16 rounded-full transition-all duration-300",
                            selectedContact === method.name ? "bg-primary text-primary-foreground scale-110" : "text-muted-foreground"
                        )}
                        onClick={() => setSelectedContact(method.name)}
                        aria-label={method.name}
                    >
                        <method.icon className="h-8 w-8" />
                    </Button>
                ))}
            </div>

            <div className="text-center min-h-[6rem] flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50">
                {selectedContact && (() => {
                    const info = getContactInfo();
                    if (!info) return null;
                    
                    const isClickable = info.href && info.href !== '#';

                    const content = (
                        <>
                            <p className="text-lg font-semibold">{info.name}</p>
                            <p className="text-muted-foreground text-base">{info.content}</p>
                        </>
                    );

                    return isClickable ? (
                        <Link href={info.href!} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            {content}
                        </Link>
                    ) : (
                        <div>{content}</div>
                    )
                })()}
            </div>
        </CardContent>
      </Card>
    </main>
  );
}
