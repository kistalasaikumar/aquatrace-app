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

const generateWaterSavingTipsFlow = ai.defineFlow(
  {
    name: 'generateWaterSavingTipsFlow',
    inputSchema: WaterFootprintAnalysisInputSchema,
    outputSchema: WaterSavingTipsOutputSchema,
  },
  async input => {
    const { text } = await ai.generate({
        model: 'googleai/gemini-pro',
        prompt: `You are an expert in water conservation. Based on the following data, generate a list of 5 personalized water-saving tips.
  
        Data:
        - Household Size: ${input.householdSize}
        - Diet Type: ${input.dietType}
        - Average Shower Time: ${input.showerTime} minutes
        - Laundry Frequency: ${input.laundryFrequency} loads per week
        - Outdoor Watering: ${input.outdoorWatering}
  
        Return the tips as a JSON object with a single key "tips" which is an array of strings. For example: {"tips": ["Tip 1", "Tip 2"]}`,
    });

    try {
        const parsed = JSON.parse(text);
        // Validate the parsed object against the Zod schema
        const validatedOutput = WaterSavingTipsOutputSchema.parse(parsed);
        return validatedOutput;
    } catch (e) {
        console.error("Failed to parse AI output:", e);
        // Return a default or error state if parsing fails
        return { tips: ["Could not generate tips at this time. Please try again later."] };
    }
  }
);
