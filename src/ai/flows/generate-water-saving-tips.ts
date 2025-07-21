'use server';
/**
 * @fileOverview AI agent that generates personalized water saving tips based on water footprint analysis.
 *
 * - generateWaterSavingTips - A function that generates personalized water saving tips.
 * - WaterFootprintAnalysisInput - The input type for the generateWaterSavingTips function.
 * - WaterSavingTipsOutput - The return type for the generateWaterSavingTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WaterFootprintAnalysisInputSchema = z.object({
  householdSize: z.number().describe('The number of people in the household.'),
  dietType: z
    .string()
    .describe(
      'The type of diet followed, e.g., vegan, vegetarian, omnivore. This significantly impacts water footprint due to varying water requirements for food production.'
    ),
  showerTime: z
    .number()
    .describe(
      'Average shower time in minutes, influencing the water consumption related to personal hygiene.'
    ),
  laundryFrequency: z
    .number()
    .describe(
      'The number of laundry loads per week, affecting water usage through washing clothes.'
    ),
  outdoorWatering: z
    .string()
    .describe(
      'Information on outdoor watering habits, detailing the frequency and duration of watering gardens or lawns, which impacts external water usage.'
    ),
  location: z
    .string()
    .describe(
      'The general location of the user (City, Country). This helps in understanding water availability and regional water consumption patterns.'
    ),
});

export type WaterFootprintAnalysisInput = z.infer<
  typeof WaterFootprintAnalysisInputSchema
>;

export type ExtendedWaterFootprintAnalysisInput = WaterFootprintAnalysisInput & {
    userName: string;
}

const WaterSavingTipsOutputSchema = z.object({
  tips: z
    .array(z.string())
    .describe('A list of personalized water saving tips.'),
});

export type WaterSavingTipsOutput = z.infer<typeof WaterSavingTipsOutputSchema>;

export async function generateWaterSavingTips(
  input: WaterFootprintAnalysisInput
): Promise<WaterSavingTipsOutput> {
  return generateWaterSavingTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'waterSavingTipsPrompt',
  input: {schema: WaterFootprintAnalysisInputSchema},
  output: {schema: WaterSavingTipsOutputSchema},
  prompt: `You are an expert in water conservation, skilled at providing personalized and actionable advice to reduce water consumption.

  Based on the following water footprint analysis, generate a list of personalized water saving tips.

  Household Size: {{{householdSize}}}
  Diet Type: {{{dietType}}}
  Shower Time (minutes): {{{showerTime}}}
  Laundry Frequency (loads per week): {{{laundryFrequency}}}
  Outdoor Watering Habits: {{{outdoorWatering}}}
  Location: {{{location}}}

  Provide specific, actionable tips tailored to the user's situation. Focus on high-impact changes that can significantly reduce their water footprint.
  Include tips related to:
  - Reducing water consumption in the bathroom (e.g., shorter showers, low-flow showerheads).
  - Optimizing laundry habits (e.g., washing full loads, using cold water).
  - Conserving water in the kitchen (e.g., fixing leaks, using a dishwasher efficiently).
  - Reducing water usage in the yard and garden (e.g., watering deeply but less frequently, using drought-tolerant plants).
  - Adjusting dietary choices to reduce water footprint (e.g., eating less meat, choosing locally sourced foods).

  The tips should be clear, concise, and easy to implement. The tips should be appropriate and applicable to the user's location. Ensure they are relevant to the user's lifestyle and habits.

  Format the tips as a bulleted list.
  `,
});

const generateWaterSavingTipsFlow = ai.defineFlow(
  {
    name: 'generateWaterSavingTipsFlow',
    inputSchema: WaterFootprintAnalysisInputSchema,
    outputSchema: WaterSavingTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
