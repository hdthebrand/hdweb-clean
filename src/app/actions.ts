'use server';

import { generateTextVariations, TextVariationInput } from '@/ai/flows/text-variation-generator';
import { z } from 'zod';

const ActionInputSchema = z.object({
  text: z.string().min(1, 'Text cannot be empty.'),
  numberOfVariations: z.coerce.number().min(1).max(5),
  tone: z.string().optional(),
  vocabulary: z.string().optional(),
});

export async function generateVariationsAction(prevState: any, formData: FormData) {
  const input = {
    text: formData.get('text'),
    numberOfVariations: formData.get('numberOfVariations'),
    tone: formData.get('tone'),
    vocabulary: formData.get('vocabulary'),
  };

  const validationResult = ActionInputSchema.safeParse(input);

  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.flatten().fieldErrors,
      data: null,
    };
  }

  try {
    const result = await generateTextVariations(validationResult.data as TextVariationInput);
    return { success: true, data: result.variations, error: null };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'An unexpected error occurred.', data: null };
  }
}
