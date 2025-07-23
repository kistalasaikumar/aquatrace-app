
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

const itemDetectionTool = ai.defineTool(
    {
        name: 'getItemAndQuantity',
        description: 'Identifies the item and quantity from a user query about virtual water. The item must be one of the known items.',
        inputSchema: z.object({
            query: z.string(),
        }),
        outputSchema: z.object({
            item: z.string().describe(`The identified item. Must be one of: ${Object.keys(VIRTUAL_WATER_DATA).join(', ')}`),
            quantity: z.number().describe('The identified quantity. Defaults to 1 if not specified.'),
        }),
    },
    async ({query}) => {
        // This is a simplified implementation. A real implementation would use a more robust NLP model.
        const words = query.toLowerCase().split(' ');
        let item = '';
        let quantity = 1;

        for (const word of words) {
            const singularWord = word.endsWith('s') ? word.slice(0, -1) : word;
            if (VIRTUAL_WATER_DATA[singularWord]) {
                item = singularWord;
            }
        }
        
        const numberMatch = query.match(/\d+/);
        if (numberMatch) {
            quantity = parseInt(numberMatch[0], 10);
        }

        if (!item) {
           throw new Error("Could not identify a valid item in the query.");
        }

        return { item, quantity };
    }
);


export async function visualizeWaterFootprint(input: ARVisualizerInput): Promise<ARVisualizerOutput> {
  return arVisualizerFlow(input);
}

const arVisualizerFlow = ai.defineFlow(
  {
    name: 'arVisualizerFlow',
    inputSchema: ARVisualizerInputSchema,
    outputSchema: ARVisualizerOutputSchema,
  },
  async (input) => {
    const {toolCalls, toolOutputs} = await ai.generate({
        model: 'googleai/gemini-2.0-flash',
        prompt: `You are an AR assistant. Your task is to identify an item and its quantity from the user's query.
        Use the 'getItemAndQuantity' tool to parse the following query: "${input.query}"`,
        tools: [itemDetectionTool],
        toolConfig: {
          mode: 'required',
          requiredTool: 'getItemAndQuantity',
        }
    });

    if (!toolCalls || toolCalls.length === 0 || !toolOutputs || toolOutputs.length === 0) {
        throw new Error("The model did not call the required tool.");
    }
    
    const { item, quantity } = itemDetectionTool.getOutput(toolOutputs[0]);

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
