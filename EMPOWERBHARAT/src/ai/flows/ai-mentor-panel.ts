// src/ai/flows/ai-mentor-panel.ts
'use server';
/**
 * @fileOverview Provides hyper-local career advice and opportunities in the user's native language.
 *
 * - getHyperLocalCareerAdvice - A function that orchestrates the retrieval of personalized career advice.
 * - HyperLocalCareerAdviceInput - The input type for the getHyperLocalCareerAdvice function.
 * - HyperLocalCareerAdviceOutput - The return type for the getHyperLocalCareerAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HyperLocalCareerAdviceInputSchema = z.object({
  age: z.number().describe('The user\'s age.'),
  location: z.string().describe('The user\'s current location.'),
  tenthMarks: z.number().describe('The user\'s 10th grade marks.'),
  twelfthMarks: z.number().describe('The user\'s 12th grade marks.'),
  graduationStatus: z.string().describe('The user\'s graduation status (e.g., completed, pursuing).'),
  skills: z.array(z.string()).describe('A list of the user\'s skills.'),
  languages: z.array(z.string()).describe('A list of languages the user speaks.'),
  projects: z.array(z.string()).describe('A list of projects the user has worked on.'),
  category: z.string().describe('The user\'s category (e.g., SC, ST, OBC, EWS).'),
});
export type HyperLocalCareerAdviceInput = z.infer<typeof HyperLocalCareerAdviceInputSchema>;

const HyperLocalCareerAdviceOutputSchema = z.object({
  opportunities: z.array(z.string()).describe('A list of hyper-local opportunities.'),
  advice: z.string().describe('Personalized career advice in the user\'s native language.'),
});
export type HyperLocalCareerAdviceOutput = z.infer<typeof HyperLocalCareerAdviceOutputSchema>;

export async function getHyperLocalCareerAdvice(input: HyperLocalCareerAdviceInput): Promise<HyperLocalCareerAdviceOutput> {
  return hyperLocalCareerAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'hyperLocalCareerAdvicePrompt',
  input: {schema: HyperLocalCareerAdviceInputSchema},
  output: {schema: HyperLocalCareerAdviceOutputSchema},
  prompt: `You are an AI Mentor Panel, providing hyper-local career advice and opportunities to users in their native language.

  Consider the following information about the user:
  - Age: {{{age}}}
  - Location: {{{location}}}
  - 10th Marks: {{{tenthMarks}}}
  - 12th Marks: {{{twelfthMarks}}}
  - Graduation Status: {{{graduationStatus}}}
  - Skills: {{#each skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  - Languages: {{#each languages}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  - Projects: {{#each projects}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  - Category: {{{category}}}

  Based on this information, suggest hyper-local opportunities (e.g., MSME openings in their district, college courses in their language with reservation seats) and provide personalized career advice in their native language.
  The advice should be encouraging, clear, and actionable, helping the user understand and access relevant options.
  `,
});

const hyperLocalCareerAdviceFlow = ai.defineFlow(
  {
    name: 'hyperLocalCareerAdviceFlow',
    inputSchema: HyperLocalCareerAdviceInputSchema,
    outputSchema: HyperLocalCareerAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
