
'use server';
/**
 * @fileOverview An AI agent for visualizing virtual water in AR.
 *
 * - visualizeWaterFootprint - A function that processes user queries to visualize water footprints.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { ARVisualizerInputSchema, ARVisualizerOutputSchema, type ARVisualizerInput, type ARVisualizerOutput } from './ar-visualizer-schema';

// Values in Liters
const VIRTUAL_WATER_DATA: Record<string, number> = {
    "burger": 2500, // Average for a quarter-pound beef burger
    "apple": 95,
    "orange": 83,
    "banana": 102,
    "slice of bread": 42,
    "egg": 200,
    "cup of coffee": 140,
    "t-shirt": 2700,
    "jeans": 7570,
};

export async function visualizeWaterFootprint(input: ARVisualizerInput): Promise<ARVisualizerOutput> {
  return arVisualizerFlow(input);
}

const ItemAndQuantitySchema = z.object({
    item: z.string().describe(`The identified item. Must be one of: ${Object.keys(VIRTUAL_WATER_DATA).join(', ')}`),
    quantity: z.number().describe('The identified quantity. Defaults to 1 if not specified.'),
});

const arVisualizerFlow = ai.defineFlow(
  {
    name: 'arVisualizerFlow',
    inputSchema: ARVisualizerInputSchema,
    outputSchema: ARVisualizerOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
        model: 'googleai/gemini-2.0-flash',
        prompt: `From the user query, identify the item and its quantity.
        The item must be one of the following: ${Object.keys(VIRTUAL_WATER_DATA).join(', ')}.
        If no quantity is specified, assume the quantity is 1.

        User Query: "${input.query}"`,
        output: {
            schema: ItemAndQuantitySchema,
        },
    });

    if (!output) {
      throw new Error("Could not extract item and quantity from the query.");
    }
    
    const { item, quantity } = output;

    if (!item || !VIRTUAL_WATER_DATA[item]) {
      throw new Error(`Could not find water data for item: ${item}`);
    }

    const totalWater = VIRTUAL_WATER_DATA[item] * quantity;

    const explanation = `It takes approximately ${totalWater.toLocaleString()} liters of virtual water to produce ${quantity} ${item}(s).`;

    return {
      item,
      quantity,
      totalWater,
      explanation,
    };
  }
);
