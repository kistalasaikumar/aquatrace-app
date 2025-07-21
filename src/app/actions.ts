'use server';

import { 
  generateWaterSavingTips, 
  type WaterFootprintAnalysisInput,
  type WaterSavingTipsOutput
} from '@/ai/flows/generate-water-saving-tips';

export async function getWaterSavingTipsAction(
  input: WaterFootprintAnalysisInput
): Promise<WaterSavingTipsOutput> {
  // Add any additional validation or processing here if needed
  try {
    const tips = await generateWaterSavingTips(input);
    return tips;
  } catch (error) {
    console.error('Error generating water saving tips:', error);
    throw new Error('Failed to generate water saving tips.');
  }
}
