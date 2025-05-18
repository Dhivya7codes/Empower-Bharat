// src/ai/flows/career-coach.ts
'use server';
/**
 * @fileOverview AI-Powered Career Coach. Provides personalized learning plans, quizzes, and career suggestions.
 *
 * - personalizedLearningPlan - A function that generates a personalized daily learning plan.
 * - PersonalizedLearningPlanInput - The input type for the personalizedLearningPlan function.
 * - PersonalizedLearningPlanOutput - The return type for the personalizedLearningPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedLearningPlanInputSchema = z.object({
  age: z.number().describe('The user\'s age.'),
  location: z.string().describe('The user\'s location.'),
  tenthMarks: z.number().describe('The user\'s 10th grade marks.'),
  twelfthMarks: z.number().describe('The user\'s 12th grade marks.'),
  graduationStatus: z.string().describe('The user\'s graduation status.'),
  skills: z.array(z.string()).describe('The user\'s current skills.'),
  languages: z.array(z.string()).describe('The languages the user speaks.'),
  projects: z.array(z.string()).describe('The user\'s projects.'),
});
export type PersonalizedLearningPlanInput = z.infer<typeof PersonalizedLearningPlanInputSchema>;

const PersonalizedLearningPlanOutputSchema = z.object({
  dailyPlan: z.string().describe('A personalized daily learning plan for the user.'),
  quiz: z.string().describe('An AI-generated quiz based on the user\'s skills and learning plan.'),
  careerSuggestions: z.array(z.string()).describe('Career suggestions based on the user\'s profile.'),
});
export type PersonalizedLearningPlanOutput = z.infer<typeof PersonalizedLearningPlanOutputSchema>;

export async function personalizedLearningPlan(input: PersonalizedLearningPlanInput): Promise<PersonalizedLearningPlanOutput> {
  return personalizedLearningPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedLearningPlanPrompt',
  input: {schema: PersonalizedLearningPlanInputSchema},
  output: {schema: PersonalizedLearningPlanOutputSchema},
  prompt: `You are an AI career coach. Based on the user's profile, provide a personalized daily learning plan, an AI-generated quiz, and career suggestions.

User Profile:
Age: {{{age}}}
Location: {{{location}}}
10th Marks: {{{tenthMarks}}}
12th Marks: {{{twelfthMarks}}}
Graduation Status: {{{graduationStatus}}}
Skills: {{#each skills}}{{{this}}}, {{/each}}
Languages: {{#each languages}}{{{this}}}, {{/each}}
Projects: {{#each projects}}{{{this}}}, {{/each}}

Response:
Daily Learning Plan:
Quiz:
Career Suggestions:`, // Updated Prompt
});

const personalizedLearningPlanFlow = ai.defineFlow(
  {
    name: 'personalizedLearningPlanFlow',
    inputSchema: PersonalizedLearningPlanInputSchema,
    outputSchema: PersonalizedLearningPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
