'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, Users, Utensils, ShowerHead, Shirt, MapPin, Flower } from 'lucide-react';
import type { WaterFootprintAnalysisInput } from '@/ai/flows/generate-water-saving-tips';

const formSchema = z.object({
  householdSize: z.coerce.number().min(1, 'Must be at least 1').max(20, 'Please enter a smaller number'),
  dietType: z.string({ required_error: 'Please select a diet type.' }),
  showerTime: z.coerce.number().min(0, 'Cannot be negative').max(60, 'Please enter a shorter time'),
  laundryFrequency: z.coerce.number().min(0, 'Cannot be negative').max(30, 'Please enter a smaller number'),
  outdoorWatering: z.string().min(1, 'Please describe your watering habits.'),
  location: z.string().min(2, 'Please enter a valid location.'),
});

interface QuestionnaireFormProps {
  onSubmit: (data: WaterFootprintAnalysisInput) => void;
  isLoading: boolean;
}

export function QuestionnaireForm({ onSubmit, isLoading }: QuestionnaireFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      householdSize: 1,
      dietType: 'Omnivore',
      showerTime: 8,
      laundryFrequency: 4,
      outdoorWatering: 'Water lawn twice a week',
      location: 'New York, USA',
    },
  });

  return (
    <Card className="w-full shadow-lg border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">Your Water Profile</CardTitle>
        <CardDescription>Answer a few questions to calculate your virtual water footprint.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="householdSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Users className="w-4 h-4" /> Household Size</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 4" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dietType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Utensils className="w-4 h-4" /> Diet Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your primary diet" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Omnivore">Omnivore</SelectItem>
                        <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="Vegan">Vegan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="showerTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><ShowerHead className="w-4 h-4" /> Avg. Shower Time (min)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="laundryFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Shirt className="w-4 h-4" /> Laundry Loads / week</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="outdoorWatering"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Flower className="w-4 h-4" /> Outdoor Watering</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Never, Daily, etc." {...field} />
                    </FormControl>
                     <FormDescription>Describe your garden/lawn watering habits.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Your Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., City, Country" {...field} />
                    </FormControl>
                     <FormDescription>Helps tailor tips to your region.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CardFooter className="px-0 pt-6 pb-0">
               <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  'Calculate Footprint'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
