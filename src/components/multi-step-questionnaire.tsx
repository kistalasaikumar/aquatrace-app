'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import { Loader2, Users, Utensils, ShowerHead, Shirt, MapPin, Flower, Droplets, ArrowLeft, Beef, ShoppingCart } from 'lucide-react';
import type { WaterFootprintAnalysisInput } from '@/ai/flows/generate-water-saving-tips';
import { Slider } from './ui/slider';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Progress } from './ui/progress';
import { DUAL_FLUSH_ICON, LOW_FLOW_ICON, STANDARD_FLUSH_ICON } from './icons';

const formSchema = z.object({
  // Step 1
  householdSize: z.number().min(1).max(20),
  showerTime: z.number().min(0).max(60),
  dailyFaucetTime: z.number().min(0).max(60),
  showerType: z.string(),
  toiletType: z.string(),
  bathFrequency: z.string(),
  gardenWatering: z.string(),
  
  // Step 2
  dietType: z.string(),
  eatOutFrequency: z.string(),
  foodWasteFrequency: z.string(),
  
  // Step 3
  laundryFrequency: z.number().min(0).max(30),
  shoppingFrequency: z.string(),
  location: z.string().min(2, 'Please enter a valid location.'),
});

// For mapping to the AI flow input
const fullFormSchema = z.object({
  householdSize: z.coerce.number().min(1, 'Must be at least 1').max(20, 'Please enter a smaller number'),
  dietType: z.string({ required_error: 'Please select a diet type.' }),
  showerTime: z.coerce.number().min(0, 'Cannot be negative').max(60, 'Please enter a shorter time'),
  laundryFrequency: z.coerce.number().min(0, 'Cannot be negative').max(30, 'Please enter a smaller number'),
  outdoorWatering: z.string().min(1, 'Please describe your watering habits.'),
  location: z.string().min(2, 'Please enter a valid location.'),
});


interface MultiStepQuestionnaireProps {
  onSubmit: (data: WaterFootprintAnalysisInput) => void;
  isLoading: boolean;
}

export function MultiStepQuestionnaire({ onSubmit, isLoading }: MultiStepQuestionnaireProps) {
  const [step, setStep] = useState(1);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      householdSize: 4,
      showerTime: 10,
      dailyFaucetTime: 5,
      showerType: "Standard",
      toiletType: "Standard",
      bathFrequency: "Weekly",
      gardenWatering: "Weekly",
      dietType: "Omnivore",
      eatOutFrequency: "Few times a week",
      foodWasteFrequency: "Sometimes",
      laundryFrequency: 4,
      shoppingFrequency: "Monthly",
      location: 'New York, USA',
    },
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  
  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    const outdoorWatering = `Takes baths ${data.bathFrequency.toLowerCase()}. Waters garden/lawn ${data.gardenWatering.toLowerCase()}.`;
    
    const submissionData: WaterFootprintAnalysisInput = {
        householdSize: data.householdSize,
        dietType: data.dietType,
        showerTime: data.showerTime,
        laundryFrequency: data.laundryFrequency,
        outdoorWatering: outdoorWatering,
        location: data.location,
    }
    onSubmit(submissionData);
  }

  const progress = Math.round((step / 3) * 100);

  return (
    <Card className="w-full max-w-2xl shadow-lg border-2 border-primary/20 animate-in fade-in-50 duration-500">
       <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            <Droplets className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="font-headline text-2xl text-primary-dark pt-2">
            {step === 1 && "Household Habits"}
            {step === 2 && "Dietary Habits"}
            {step === 3 && "Consumption Habits"}
        </CardTitle>
        <CardDescription>
            Step {step} of 3: 
            {step === 1 && " Start with questions about your home water use."}
            {step === 2 && " Tell us about what you eat."}
            {step === 3 && " A few more questions about your lifestyle."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
            {step === 1 && (
              <div className="space-y-8">
                <FormField
                    control={form.control}
                    name="householdSize"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center gap-2"><Users className="w-4 h-4" /> How many people in your household?</FormLabel>
                        <FormControl>
                            <div className='flex items-center gap-4'>
                                <Slider defaultValue={[field.value]} value={[field.value]} onValueChange={(value) => field.onChange(value[0])} max={10} min={1} step={1} />
                                <span className='font-bold text-primary w-4 text-center'>{field.value}</span>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="showerTime"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Average shower time (minutes)?</FormLabel>
                            <FormControl>
                                <div className='flex items-center gap-4'>
                                    <Slider defaultValue={[field.value]} value={[field.value]} onValueChange={(value) => field.onChange(value[0])} max={30} step={1} />
                                    <span className='font-bold text-primary w-6 text-center'>{field.value}</span>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dailyFaucetTime"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Daily faucet running time (minutes)?</FormLabel>
                            <FormControl>
                                <div className='flex items-center gap-4'>
                                    <Slider defaultValue={[field.value]} value={[field.value]} onValueChange={(value) => field.onChange(value[0])} max={30} step={1} />
                                    <span className='font-bold text-primary w-6 text-center'>{field.value}</span>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="showerType"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Shower Type</FormLabel>
                             <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Standard" />
                                        </FormControl>
                                        <FormLabel className="font-normal flex items-center gap-1.5"><ShowerHead size={16}/> Standard</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Low-Flow" />
                                        </FormControl>
                                        <FormLabel className="font-normal flex items-center gap-1.5"><LOW_FLOW_ICON className="w-4 h-4" /> Low-Flow</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                             </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="toiletType"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Toilet Type</FormLabel>
                             <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Standard" />
                                        </FormControl>
                                        <FormLabel className="font-normal flex items-center gap-1.5"><STANDARD_FLUSH_ICON className="w-4 h-4"/> Standard</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Low-Flow" />
                                        </FormControl>
                                        <FormLabel className="font-normal flex items-center gap-1.5"><LOW_FLOW_ICON className="w-4 h-4"/> Low-Flow</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Dual-Flush" />
                                        </FormControl>
                                        <FormLabel className="font-normal flex items-center gap-1.5"><DUAL_FLUSH_ICON className="w-4 h-4"/> Dual-Flush</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                             </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <FormField
                        control={form.control}
                        name="bathFrequency"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>How often do you take baths?</FormLabel>
                             <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-wrap gap-4">
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <RadioGroupItem value="Daily" />
                                        <FormLabel className="font-normal">Daily</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <RadioGroupItem value="Weekly" />
                                        <FormLabel className="font-normal">Weekly</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <RadioGroupItem value="Monthly" />
                                        <FormLabel className="font-normal">Monthly</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <RadioGroupItem value="Never" />
                                        <FormLabel className="font-normal">Never</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                             </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="gardenWatering"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Garden/Lawn Watering</FormLabel>
                             <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-wrap gap-4">
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <RadioGroupItem value="Daily" />
                                        <FormLabel className="font-normal">Daily</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <RadioGroupItem value="Weekly" />
                                        <FormLabel className="font-normal">Weekly</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <RadioGroupItem value="Never" />
                                        <FormLabel className="font-normal">Never</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                             </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                 </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-8">
                <FormField
                    control={form.control}
                    name="dietType"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center gap-2"><Utensils className="w-4 h-4" /> Diet Type</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-wrap gap-4">
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                    <RadioGroupItem value="Omnivore" />
                                    <FormLabel className="font-normal flex items-center gap-1.5"><Beef size={16}/> Omnivore</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                    <RadioGroupItem value="Vegetarian" />
                                    <FormLabel className="font-normal flex items-center gap-1.5"><Flower size={16}/> Vegetarian</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                    <RadioGroupItem value="Vegan" />
                                    <FormLabel className="font-normal flex items-center gap-1.5"><Flower size={16}/> Vegan</FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="eatOutFrequency"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>How often do you eat out?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Daily">Daily</SelectItem>
                                <SelectItem value="Few times a week">A few times a week</SelectItem>
                                <SelectItem value="Once a week">Once a week</SelectItem>
                                <SelectItem value="Rarely">Rarely / Never</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="foodWasteFrequency"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>How often do you throw away food?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Often">Often</SelectItem>
                                <SelectItem value="Sometimes">Sometimes</SelectItem>
                                <SelectItem value="Rarely">Rarely</SelectItem>
                                <SelectItem value="Never">Never</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <FormField
                    control={form.control}
                    name="laundryFrequency"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center gap-2"><Shirt className="w-4 h-4" /> Laundry Loads / week</FormLabel>
                         <FormControl>
                            <div className='flex items-center gap-4'>
                                <Slider defaultValue={[field.value]} value={[field.value]} onValueChange={(value) => field.onChange(value[0])} max={15} step={1} />
                                <span className='font-bold text-primary w-6 text-center'>{field.value}</span>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="shoppingFrequency"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className='flex items-center gap-2'><ShoppingCart size={16} /> How often do you buy new clothing?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Weekly">Weekly</SelectItem>
                                <SelectItem value="Monthly">Monthly</SelectItem>
                                <SelectItem value="Few times a year">A few times a year</SelectItem>
                                <SelectItem value="Rarely">Rarely / Never</SelectItem>
                            </SelectContent>
                        </Select>
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
            )}

            <CardFooter className="px-0 pt-6 pb-0 flex-col items-stretch gap-4">
               <Progress value={progress} className="w-full h-2" />
               <div className='flex justify-between items-center'>
                    <div>
                        {step > 1 && <Button type="button" variant="ghost" onClick={prevStep}><ArrowLeft className='mr-2' /> Back</Button>}
                    </div>
                    <div>
                        {step < 3 && <Button type="button" onClick={nextStep}>Next</Button>}
                        {step === 3 && 
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Calculating...
                                </>
                                ) : (
                                'Calculate Footprint'
                                )}
                            </Button>
                        }
                    </div>
                </div>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}