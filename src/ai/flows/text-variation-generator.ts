'use server';

/**
 * @fileOverview Generates multiple text variations with altered tone and vocabulary.
 *
 * - generateTextVariations - A function that generates text variations.
 * - TextVariationInput - The input type for the generateTextVariations function.
 * - TextVariationOutput - The return type for the generateTextVariations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TextVariationInputSchema = z.object({
  text: z.string().describe('The input text to generate variations from.'),
  numberOfVariations: z
    .number()
    .min(1)
    .max(5)
    .default(3)
    .describe('The number of text variations to generate.'),
  tone: z
    .string()
    .optional()
    .describe('The desired tone for the text variations (e.g., formal, informal, humorous).'),
  vocabulary: z
    .string()
    .optional()
    .describe('The desired vocabulary style for the text variations (e.g., simple, sophisticated).'),
});
export type TextVariationInput = z.infer<typeof TextVariationInputSchema>;

const TextVariationOutputSchema = z.object({
  variations: z.array(z.string()).describe('An array of text variations.'),
});
export type TextVariationOutput = z.infer<typeof TextVariationOutputSchema>;

export async function generateTextVariations(input: TextVariationInput): Promise<TextVariationOutput> {
  return textVariationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'textVariationPrompt',
  input: {schema: TextVariationInputSchema},
  output: {schema: TextVariationOutputSchema},
  prompt: `You are a creative text generator. You will generate multiple variations of a given text, altering the tone and vocabulary as requested. You must return a JSON object with a "variations" key, which holds an array of the text variations.

Original Text: {{{text}}}
Number of Variations: {{{numberOfVariations}}}
Tone: {{{tone}}}
Vocabulary: {{{vocabulary}}}`,
});

const textVariationFlow = ai.defineFlow(
  {
    name: 'textVariationFlow',
    inputSchema: TextVariationInputSchema,
    outputSchema: TextVariationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
