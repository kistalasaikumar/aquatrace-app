import {z} from 'genkit';

export const ARVisualizerInputSchema = z.object({
  query: z.string().describe('The user\'s request, e.g., "show water for 3 burgers"'),
});
export type ARVisualizerInput = z.infer<typeof ARVisualizerInputSchema>;

export const ARVisualizerOutputSchema = z.object({
  item: z.string().describe('The item identified in the query (e.g., "burger").'),
  quantity: z.number().describe('The quantity of the item (e.g., 3).'),
  totalWater: z.number().describe('The total virtual water in liters.'),
  explanation: z.string().describe('A brief explanation of the result.'),
});
export type ARVisualizerOutput = z.infer<typeof ARVisualizerOutputSchema>;
