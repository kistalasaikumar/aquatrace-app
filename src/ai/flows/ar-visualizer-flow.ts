'use server';
/**
 * @fileOverview An AI agent for visualizing virtual water in AR.
 *
 * - visualizeWaterFootprint - A function that processes user queries to visualize water footprints.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { ARVisualizerInputSchema, ARVisualizerOutputSchema, type ARVisualizerInput, type ARVisualizerOutput } from './ar-visualizer-schema';

const VIRTUAL_WATER_DATA: Record<string, number> = {
    "burger": 660, // Average for a quarter-pound beef burger in gallons
    "apple": 25,
    "orange": 22,
    "banana": 27,
    "slice of bread": 11,
    "egg": 53,
    "cup of coffee": 37,
    "t-shirt": 713,
    "jeans": 2000,
};

const itemDetectionTool = ai.defineTool(
    {
        name: 'getItemAndQuantity',
        description: 'Identifies the item and quantity from a user query about virtual water.',
        inputSchema: z.object({
            query: z.string(),
        }),
        outputSchema: z.object({
            item: z.string().describe(`The identified item. Must be one of: ${Object.keys(VIRTUAL_WATER_DATA).join(', ')}`),
            quantity: z.number(),
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

const prompt = ai.definePrompt({
  name: 'arVisualizerPrompt',
  input: { schema: ARVisualizerInputSchema },
  output: { schema: ARVisualizerOutputSchema },
  tools: [itemDetectionTool],
  prompt: `You are an AR assistant for AquaTrace. Your goal is to help users visualize the virtual water footprint of everyday items.
  
  Use the getItemAndQuantity tool to parse the user's query: {{{query}}}
  
  Once you have the item and quantity, calculate the total water footprint. The virtual water for one unit of the identified item is provided by the tool's logic.
  
  Finally, provide a concise, one-sentence explanation for the result. For example: "It takes about 1,980 gallons of water to produce 3 beef burgers."
  `,
});

const arVisualizerFlow = ai.defineFlow(
  {
    name: 'arVisualizerFlow',
    inputSchema: ARVisualizerInputSchema,
    outputSchema: ARVisualizerOutputSchema,
  },
  async (input) => {
    const {toolCalls, toolOutputs} = await ai.generate({
        model: 'googleai/gemini-2.0-flash',
        prompt: `Parse this query: ${input.query}`,
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

    const explanation = `It takes approximately ${totalWater.toLocaleString()} gallons of virtual water to produce ${quantity} ${item}(s).`;

    return {
      item,
      quantity,
      totalWater,
      explanation,
    };
  }
);
