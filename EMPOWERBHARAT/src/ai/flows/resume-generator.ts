
'use server';
/**
 * @fileOverview Generates a professional resume based on user profile and suggests matched opportunities.
 *
 * - generateResume - Function to generate resume text and opportunity suggestions.
 * - GenerateResumeInput - Input type for the function.
 * - GenerateResumeOutput - Output type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { ProfileSchema } from '@/lib/schema'; // Import the Zod schema type

// Input Schema: User profile data is the primary input
const GenerateResumeInputSchema = z.object({
    profile: z.custom<ProfileSchema>().describe('The user\'s profile data containing details like name, skills, education, projects, etc.'),
    targetRole: z.string().optional().describe('Optional: A specific role the user is targeting for tailored suggestions.'),
});
export type GenerateResumeInput = z.infer<typeof GenerateResumeInputSchema>;

// Output Schema: Resume text and suggested opportunities
const GenerateResumeOutputSchema = z.object({
  resumeText: z.string().describe('Professionally formatted resume text in Markdown or plain text format.'),
  matchedOpportunities: z.array(
    z.string()
  ).describe('A list of suggested jobs, internships, or scholarships relevant to the generated resume and user profile (max 5 suggestions).'),
});
export type GenerateResumeOutput = z.infer<typeof GenerateResumeOutputSchema>;

// Exported wrapper function
export async function generateResume(input: GenerateResumeInput): Promise<GenerateResumeOutput> {
  console.log("Generating resume for:", input.profile.name);
   // For now, returning placeholder data as AI generation is not implemented
  // Replace with actual flow call later: return resumeGeneratorFlow(input);

  // Placeholder Logic:
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
  const profile = input.profile;
  const placeholderText = `
## ${profile.name ?? 'Your Name'}
**Location:** ${profile.location ?? 'Your Location'} | **Age:** ${profile.age ?? 'N/A'} | **Category:** ${profile.category ?? 'N/A'}

**Summary:**
A motivated and adaptable individual residing in ${profile.location ?? 'N/A'}. Possesses skills in ${profile.skills?.slice(0, 3).join(', ') ?? 'key areas'}${profile.skills && profile.skills.length > 3 ? '...' : ''}. Seeking opportunities ${input.targetRole ? `related to ${input.targetRole}` : 'for growth and contribution'}. Fluent in ${profile.languages?.join(', ') ?? 'multiple languages'}.

**Education:**
*   Graduation Status: ${profile.graduationStatus ?? 'N/A'}
*   12th Standard Marks: ${profile.twelfthMarks ?? 'N/A'}% (if provided)
*   10th Standard Marks: ${profile.tenthMarks ?? 'N/A'}% (if provided)

**Skills:**
${profile.skills?.map(skill => `*   ${skill}`).join('\n') ?? '*   Skill details not provided.'}

**Projects (Optional):**
${profile.projects && profile.projects.length > 0 ? profile.projects.map(proj => `*   ${proj}`).join('\n') : '*   No projects listed.'}

**Languages:**
*   ${profile.languages?.join('\n*   ') ?? 'Language details not provided.'}
    `.trim().replace(/^\s*[\r\n]/gm, ''); // Clean up extra lines

   const placeholderOpportunities = [
        `Suggested Job: Entry-level role related to ${profile.skills?.[0] ?? 'your skills'} in ${profile.location ?? 'your area'}.`,
        `Suggested Scholarship: Check eligibility for ${profile.category ?? 'General'} category scholarships on the National Scholarship Portal.`,
        `Suggested Course: Upskilling course in ${profile.skills?.[1] ?? 'a relevant skill'}.`,
   ];

  return {
    resumeText: placeholderText,
    matchedOpportunities: placeholderOpportunities.slice(0, 5), // Limit suggestions
  };
}

// Define the Genkit Prompt
const prompt = ai.definePrompt({
  name: 'resumeGeneratorPrompt',
  input: { schema: GenerateResumeInputSchema },
  output: { schema: GenerateResumeOutputSchema },
  prompt: `
    You are an expert resume writer and career advisor for EmpowerBharat, focusing on users from diverse backgrounds in India, including those in non-tech fields.
    Generate a professional, concise resume in plain text or Markdown format based on the provided user profile.
    Also, suggest a maximum of 5 relevant opportunities (jobs, internships, government schemes/yojanas, scholarships, or relevant courses) based on the user's profile, prioritizing local opportunities if location is available.

    User Profile:
    - Name: {{{profile.name}}}
    - Age: {{{profile.age}}}
    - Location: {{{profile.location}}}
    - 10th Marks (%): {{#if profile.tenthMarks}}{{{profile.tenthMarks}}}{{else}}N/A{{/if}}
    - 12th Marks (%): {{#if profile.twelfthMarks}}{{{profile.twelfthMarks}}}{{else}}N/A{{/if}}
    - Graduation Status: {{{profile.graduationStatus}}}
    - Skills: {{#each profile.skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
    - Languages: {{#each profile.languages}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
    - Projects: {{#if profile.projects}}{{#each profile.projects}}{{{this}}}{{#unless @last}}; {{/unless}}{{/each}}{{else}}N/A{{/if}}
    - Category: {{#if profile.category}}{{{profile.category}}}{{else}}N/A{{/if}}
    {{#if targetRole}}- Target Role: {{{targetRole}}}{{/if}}

    **Resume Generation Guidelines:**
    1.  **Format:** Use clear headings (Summary, Education, Skills, Projects, Languages). Use bullet points for lists. Keep it concise and professional. Avoid jargon.
    2.  **Summary:** Write a brief (2-3 sentences) professional summary highlighting key skills, location (if available), and career objective (mention target role if provided).
    3.  **Education:** List education details clearly. Mention marks only if provided.
    4.  **Skills:** List all provided skills using bullet points.
    5.  **Projects:** List projects using bullet points if provided. If not, state "No projects listed" or omit the section.
    6.  **Languages:** List languages spoken.
    7.  **Tone:** Positive, professional, and action-oriented.

    **Opportunity Suggestion Guidelines:**
    1.  Suggest a mix of relevant jobs, internships, government schemes/scholarships, and/or online courses.
    2.  Prioritize opportunities relevant to the user's skills, location, and category (if applicable).
    3.  If suggesting jobs/internships, mention potential roles or sectors.
    4.  If suggesting schemes/scholarships, mention specific types or portals (e.g., "Merit-cum-Means Scholarship", "National Scholarship Portal").
    5.  If suggesting courses, mention relevant skill areas.
    6.  Keep suggestions concise and actionable.
    7.  Provide a maximum of 5 suggestions.

    Output ONLY the JSON object matching the GenerateResumeOutputSchema.
  `,
});

// Define the Genkit Flow
const resumeGeneratorFlow = ai.defineFlow(
  {
    name: 'resumeGeneratorFlow',
    inputSchema: GenerateResumeInputSchema,
    outputSchema: GenerateResumeOutputSchema,
  },
  async (input) => {
    console.log("Calling AI for resume generation:", input.profile.name);
    // This part needs actual implementation
    // const { output } = await prompt(input);
    // if (!output) {
    //   throw new Error("AI failed to generate resume and suggestions.");
    // }
    // return output;

     // Return placeholder until AI is integrated
     await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
     const profile = input.profile;
     const placeholderText = `(AI Placeholder Resume for ${profile.name})`;
     const placeholderOpportunities = ["(AI Placeholder Suggestion 1)", "(AI Placeholder Suggestion 2)"];

     return {
        resumeText: placeholderText,
        matchedOpportunities: placeholderOpportunities,
     };
  }
);

// Note: The actual AI call within the flow is commented out.
