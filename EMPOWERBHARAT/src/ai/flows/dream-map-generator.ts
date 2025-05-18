
'use server';
/**
 * @fileOverview Generates a visual career roadmap (DreamMap) based on user profile and goal.
 *
 * - generateDreamMap - Function to generate the roadmap steps.
 * - GenerateDreamMapInput - Input type for the function.
 * - GenerateDreamMapOutput - Output type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { ProfileSchema } from '@/lib/schema'; // Import the Zod schema type

// Input Schema: User profile and their dream career goal
const GenerateDreamMapInputSchema = z.object({
    profile: z.custom<ProfileSchema>().describe('The user\'s profile data.'),
    dreamGoal: z.string().describe('The user\'s stated dream career goal (e.g., IAS Officer, Software Engineer, Fashion Designer).'),
});
export type GenerateDreamMapInput = z.infer<typeof GenerateDreamMapInputSchema>;

// Output Schema: A series of steps for the roadmap
const RoadmapStepSchema = z.object({
    step: z.number().int().positive().describe('The step number in the sequence.'),
    title: z.string().describe('A concise title for this step/phase.'),
    description: z.string().describe('A detailed description of the actions or milestones for this step.'),
    duration: z.string().describe('An estimated duration for completing this step (e.g., "3 Months", "1 Year", "Ongoing").'),
    resources: z.array(z.string()).optional().describe('Optional list of suggested resources (links, tools, course names) for this step.'),
});

const GenerateDreamMapOutputSchema = z.object({
  steps: z.array(RoadmapStepSchema).describe('An array of steps defining the career roadmap.'),
});
export type GenerateDreamMapOutput = z.infer<typeof GenerateDreamMapOutputSchema>;

// Exported wrapper function
export async function generateDreamMap(input: GenerateDreamMapInput): Promise<GenerateDreamMapOutput> {
  console.log("Generating DreamMap for:", input.profile.name, "towards goal:", input.dreamGoal);
  // For now, returning placeholder data as AI generation is not implemented
  // Replace with actual flow call later: return dreamMapGeneratorFlow(input);

   // Placeholder Logic:
   await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate delay
   const profile = input.profile;
   const goal = input.dreamGoal;
   const placeholderSteps: z.infer<typeof RoadmapStepSchema>[] = [
        { step: 1, title: "Foundation & Skill Assessment", description: `Identify foundational skills needed for ${goal}. Assess current skill level (${profile.skills?.join(', ')}) against requirements. Start learning [Basic Skill 1] via online resources.`, duration: "1-3 Months", resources: ["Skillshare", "YouTube Tutorials"] },
        { step: 2, title: "Targeted Learning & Practice", description: `Focus on core skills like [Core Skill 1] and [Core Skill 2]. Complete a beginner-level project related to ${goal}. If applicable, prepare for relevant entrance exams.`, duration: "6-12 Months", resources: ["Udemy", "GeeksforGeeks (if tech)"] },
        { step: 3, title: "Experience & Networking", description: `Seek internships, volunteer work, or entry-level positions in the ${goal} field/related areas. Connect with professionals on LinkedIn or local events. Build a portfolio.`, duration: "1-2 Years", resources: ["Internshala", "LinkedIn"] },
        { step: 4, title: "Specialization & Growth", description: `Deepen knowledge in a specific niche within ${goal}. Aim for certifications or advanced projects. Seek mentorship.`, duration: "Ongoing", resources: ["Industry Conferences", "Mentorship Platforms"] },
    ];

   return { steps: placeholderSteps };
}

// Define the Genkit Prompt
const prompt = ai.definePrompt({
  name: 'dreamMapGeneratorPrompt',
  input: { schema: GenerateDreamMapInputSchema },
  output: { schema: GenerateDreamMapOutputSchema },
  prompt: `
    You are an AI Career Strategist for EmpowerBharat. Your task is to create a personalized, step-by-step career roadmap (DreamMap) for a user based on their profile and dream goal. The roadmap should be realistic, actionable, and adapted to the Indian context.

    User Profile:
    - Name: {{{profile.name}}}
    - Age: {{{profile.age}}}
    - Location: {{{profile.location}}}
    - Skills: {{#each profile.skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
    - Languages: {{#each profile.languages}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
    - Education Status: {{{profile.graduationStatus}}}
    {{#if profile.tenthMarks}}- 10th Marks (%): {{{profile.tenthMarks}}}{{/if}}
    {{#if profile.twelfthMarks}}- 12th Marks (%): {{{profile.twelfthMarks}}}{{/if}}
    {{#if profile.projects}}- Projects: {{#each profile.projects}}{{{this}}}{{#unless @last}}; {{/unless}}{{/each}}{{/if}}
    {{#if profile.category}}- Category: {{{profile.category}}}{{/if}}

    Dream Career Goal: {{{dreamGoal}}}

    **Roadmap Generation Guidelines:**
    1.  **Analyze Goal & Profile:** Understand the typical path to the {{{dreamGoal}}} and how the user's current profile (skills, education) fits.
    2.  **Create Steps:** Define 4-6 logical, sequential steps to reach the goal. Start from the user's current position.
    3.  **Step Details:** For each step:
        *   Assign a clear **Step Number**.
        *   Write a concise **Title** (e.g., "Build Foundational Knowledge", "Gain Practical Experience").
        *   Provide a detailed **Description** outlining specific actions, skills to learn, or milestones to achieve in this phase. Personalize based on the user's existing skills/education where possible.
        *   Estimate a realistic **Duration** (e.g., "3 Months", "1 Year", "Ongoing").
        *   (Optional but helpful) Suggest relevant **Resources** (e.g., specific websites like Coursera, government portals, types of platforms like LinkedIn, exam names like UPSC/JEE, tools).
    4.  **Contextualize:** Keep the Indian context in mind (e.g., relevant exams, government schemes, popular learning platforms).
    5.  **Clarity:** Use clear, encouraging, and accessible language.

    Output ONLY the JSON object matching the GenerateDreamMapOutputSchema, containing the array of steps.
  `,
});

// Define the Genkit Flow
const dreamMapGeneratorFlow = ai.defineFlow(
  {
    name: 'dreamMapGeneratorFlow',
    inputSchema: GenerateDreamMapInputSchema,
    outputSchema: GenerateDreamMapOutputSchema,
  },
  async (input) => {
     console.log("Calling AI for DreamMap generation:", input.dreamGoal);
    // This part needs actual implementation
    // const { output } = await prompt(input);
    // if (!output) {
    //   throw new Error("AI failed to generate DreamMap steps.");
    // }
    // return output;

      // Return placeholder until AI is integrated
     await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate delay
     const placeholderSteps: z.infer<typeof RoadmapStepSchema>[] = [
         { step: 1, title: "(AI Placeholder) Step 1", description: "AI generated description for step 1.", duration: "X Months", resources: ["Resource A"] },
         { step: 2, title: "(AI Placeholder) Step 2", description: "AI generated description for step 2.", duration: "Y Months" },
     ];
     return { steps: placeholderSteps };
  }
);

// Note: The actual AI call within the flow is commented out.
