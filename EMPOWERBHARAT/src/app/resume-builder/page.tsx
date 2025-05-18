
"use client";

import { useState } from 'react';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Sparkles, Download, Briefcase, GraduationCap } from 'lucide-react';
import { useProfile } from '@/contexts/profile-context';
import { ProfileCheckWrapper } from '@/components/common/profile-check-wrapper';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { ErrorMessage } from '@/components/common/error-message';
// import { generateResume, type GenerateResumeOutput } from '@/ai/flows/resume-generator'; // To be created

export default function ResumeBuilderPage() {
  const { profile, isProfileComplete } = useProfile();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedResume, setGeneratedResume] = useState<string | null>(null); // State for generated resume text
   const [matchedOpportunities, setMatchedOpportunities] = useState<string[]>([]); // State for matched jobs/scholarships

  const handleGenerateResume = async () => {
     if (!profile) {
        setError("Please complete your profile first.");
        return;
     }
     setLoading(true);
     setError(null);
     setGeneratedResume(null);
     setMatchedOpportunities([]);

    try {
       // const resumeInput = { /* Extract necessary fields from profile */ };
       // const result = await generateResume(resumeInput); // Call AI flow
       // setGeneratedResume(result.resumeText);
       // setMatchedOpportunities(result.matchedOpportunities);

       // Placeholder generation:
       await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI call
       const placeholderText = `
## ${profile.name ?? 'Your Name'}
**Location:** ${profile.location ?? 'Your Location'} | **Age:** ${profile.age ?? 'N/A'}

**Summary:**
A motivated individual with skills in ${profile.skills?.join(', ') ?? 'various areas'}. Eager to contribute to a challenging role. Fluent in ${profile.languages?.join(', ') ?? 'multiple languages'}.

**Education:**
* Graduation Status: ${profile.graduationStatus ?? 'N/A'}
* 12th Marks: ${profile.twelfthMarks ?? 'N/A'}%
* 10th Marks: ${profile.tenthMarks ?? 'N/A'}%

**Skills:**
${profile.skills?.map(skill => `* ${skill}`).join('\n') ?? '* Skill 1\n* Skill 2'}

**Projects:**
${profile.projects?.map(proj => `* ${proj}`).join('\n') ?? '* Project details not provided.'}

**Category:** ${profile.category ?? 'N/A'} (If applicable)
       `.trim();
       setGeneratedResume(placeholderText);
       setMatchedOpportunities([
           'Suggested Job: Junior Assistant at Local Panchayat Office (based on location)',
           'Suggested Scholarship: Merit Scholarship for Category (based on profile)',
           'Suggested Course: Advanced Excel Skills (based on skills)'
       ]);

    } catch (err) {
      console.error("Error generating resume:", err);
      setError(err instanceof Error ? err.message : "Failed to generate resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <PageHeader
        title="Digital Resume Builder"
        description="Generate a professional resume and get matched with opportunities."
      />

       <ProfileCheckWrapper featureName="Resume Builder">
           <Card className="mb-6">
             <CardHeader>
                 <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary" /> AI Resume Generation</CardTitle>
                  <CardDescription>Click the button below to automatically generate a resume based on your profile.</CardDescription>
             </CardHeader>
             <CardContent>
                 <Button onClick={handleGenerateResume} disabled={loading || !isProfileComplete} className="w-full md:w-auto">
                    {loading ? <LoadingSpinner size={16} className="mr-2" /> : <FileText className="mr-2 h-4 w-4" />}
                    {loading ? 'Generating...' : 'Generate Resume'}
                 </Button>
                 {error && <ErrorMessage message={error} title="Generation Failed" />}
             </CardContent>
           </Card>

            {generatedResume && (
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Generated Resume</CardTitle>
                         <CardDescription>Review and edit the generated resume below. You can copy or download it.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea
                            value={generatedResume}
                            readOnly // Or allow editing
                            rows={15}
                            className="font-mono text-sm"
                        />
                        <div className="flex flex-wrap gap-2">
                             <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(generatedResume)}>
                                Copy Text
                             </Button>
                             <Button size="sm" disabled> {/* Add download logic later */}
                                <Download className="mr-2 h-4 w-4" /> Download PDF (Coming Soon)
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

           {matchedOpportunities.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                             <Briefcase className="text-primary" /> Matched Opportunities
                        </CardTitle>
                         <CardDescription>Based on your generated resume, here are some potential matches:</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                            {matchedOpportunities.map((opp, index) => (
                                <li key={index}>{opp}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
           )}
       </ProfileCheckWrapper>
    </div>
  );
}
