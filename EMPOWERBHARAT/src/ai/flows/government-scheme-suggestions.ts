// government-scheme-suggestions.ts
'use server';
/**
 * @fileOverview Provides suggestions for relevant government schemes, scholarships, and courses based on the user's profile.
 *
 * - suggestSchemes - A function that suggests relevant government schemes.
 * - SuggestSchemesInput - The input type for the suggestSchemes function.
 * - SuggestSchemesOutput - The return type for the suggestSchemes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSchemesInputSchema = z.object({
  age: z.number().describe('The age of the user.'),
  location: z.string().describe('The location of the user.'),
  tenthMarks: z.number().describe('The 10th grade marks of the user.'),
  twelfthMarks: z.number().describe('The 12th grade marks of the user.'),
  graduationStatus: z.string().describe('The graduation status of the user.'),
  skills: z.array(z.string()).describe('The skills of the user.'),
  languages: z.array(z.string()).describe('The languages known by the user.'),
  projects: z.array(z.string()).describe('The projects completed by the user.'),
  category: z
    .string()
    .describe(
      'The category of the user, which can be SC, ST, OBC, or EWS.'
    ),
});

export type SuggestSchemesInput = z.infer<typeof SuggestSchemesInputSchema>;

const SuggestSchemesOutputSchema = z.object({
  schemes: z
    .array(
      z.object({
        name: z.string().describe('The name of the scheme.'),
        description: z.string().describe('A brief description of the scheme.'),
        eligibility: z.string().describe('The eligibility criteria for the scheme.'),
        benefits: z.string().describe('The benefits offered by the scheme.'),
        applicationProcess: z
          .string()
          .describe('The application process for the scheme.'),
      })
    )
    .describe('A list of relevant government schemes.'),
  scholarships: z
    .array(
      z.object({
        name: z.string().describe('The name of the scholarship.'),
        description: z.string().describe('A brief description of the scholarship.'),
        eligibility: z.string().describe('The eligibility criteria for the scholarship.'),
        benefits: z.string().describe('The benefits offered by the scholarship.'),
        applicationProcess: z
          .string()
          .describe('The application process for the scholarship.'),
      })
    )
    .describe('A list of relevant scholarships.'),
  courses: z
    .array(
      z.object({
        name: z.string().describe('The name of the course.'),
        description: z.string().describe('A brief description of the course.'),
        institution: z.string().describe('The institution offering the course.'),
        duration: z.string().describe('The duration of the course.'),
        fees: z.string().describe('The fees for the course.'),
      })
    )
    .describe('A list of relevant courses.'),
});

export type SuggestSchemesOutput = z.infer<typeof SuggestSchemesOutputSchema>;

export async function suggestSchemes(
  input: SuggestSchemesInput
): Promise<SuggestSchemesOutput> {
  return suggestSchemesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSchemesPrompt',
  input: {schema: SuggestSchemesInputSchema},
  output: {schema: SuggestSchemesOutputSchema},
  prompt: `You are an AI assistant that suggests relevant government schemes, scholarships, and courses based on the user's profile.

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

  Suggest schemes, scholarships, and courses that are relevant to the user based on the above information.
  Include the name, description, eligibility, benefits, and application process for each scheme and scholarship.
  Include the name, description, institution, duration, and fees for each course.
`,
});

const suggestSchemesFlow = ai.defineFlow(
  {
    name: 'suggestSchemesFlow',
    inputSchema: SuggestSchemesInputSchema,
    outputSchema: SuggestSchemesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

