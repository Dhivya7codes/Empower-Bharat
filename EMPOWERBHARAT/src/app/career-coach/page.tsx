
"use client";

import { useState, useEffect } from 'react';
import { personalizedLearningPlan, type PersonalizedLearningPlanOutput } from '@/ai/flows/career-coach';
import { useProfile } from '@/contexts/profile-context';
import { PageHeader } from '@/components/common/page-header';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { ErrorMessage } from '@/components/common/error-message';
import { Button } from '@/components/ui/button';
import { CareerCoachResults } from './career-coach-results';
import { ProfileCheckWrapper } from '@/components/common/profile-check-wrapper';
import { ConfidenceAssessment } from './confidence-assessment'; // Import new component
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity } from 'lucide-react';

export default function CareerCoachPage() {
  const { profile, isProfileComplete, updateProfile } = useProfile(); // Use updateProfile
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [errorPlan, setErrorPlan] = useState<string | null>(null);
  const [planResults, setPlanResults] = useState<PersonalizedLearningPlanOutput | null>(null);


  const fetchCareerPlan = async () => {
    if (!profile) {
      setErrorPlan('Profile data is missing.');
      return;
    }

    // Ensure marks are numbers, default to 0 if not present
    const input = {
        ...profile,
        // Ensure required numeric fields have defaults for the AI flow
        age: profile.age ?? 0,
        location: profile.location ?? '',
        tenthMarks: profile.tenthMarks ?? 0,
        twelfthMarks: profile.twelfthMarks ?? 0,
        graduationStatus: profile.graduationStatus ?? '',
        // Ensure arrays are passed correctly, even if empty
        skills: profile.skills || [],
        languages: profile.languages || [],
        projects: profile.projects || [],
        // Add category if the flow uses it, else omit
        // category: profile.category ?? 'General',
    };


    setLoadingPlan(true);
    setErrorPlan(null);
    setPlanResults(null);

    try {
      const data = await personalizedLearningPlan(input);
      setPlanResults(data);
    } catch (err) {
      console.error('Error fetching career plan:', err);
      setErrorPlan(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoadingPlan(false);
    }
  };

  // Automatically fetch when the component mounts and profile is complete
  useEffect(() => {
    if (isProfileComplete) {
      fetchCareerPlan();
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProfileComplete]); // Depend only on profile completeness


  return (
    <div className="container mx-auto py-8 px-4 md:px-0 space-y-8">
      <PageHeader
        title="AI Career Coach"
        description="Get your personalized daily learning plan, quizzes, and career suggestions."
      >
        <Button onClick={fetchCareerPlan} disabled={loadingPlan || !isProfileComplete}>
          {loadingPlan ? <LoadingSpinner size={16} className="mr-2" /> : null}
          {loadingPlan ? 'Generating...' : 'Refresh Plan'}
        </Button>
      </PageHeader>

      <ProfileCheckWrapper featureName="Career Coach">
         {/* Learning Plan Section */}
         <Card>
           <CardHeader>
                {/* Optionally add specific header for this section */}
           </CardHeader>
           <CardContent>
               {loadingPlan && (
                   <div className="flex justify-center items-center py-10">
                       <LoadingSpinner size={32} />
                   </div>
               )}
               {errorPlan && <ErrorMessage message={errorPlan} />}
               {planResults && !loadingPlan && <CareerCoachResults data={planResults} />}
               {!loadingPlan && !errorPlan && !planResults && isProfileComplete && (
                   <p className="text-center text-muted-foreground py-10">Click 'Refresh Plan' to generate your personalized guidance.</p>
               )}
           </CardContent>
         </Card>


        {/* Confidence Assessment Section */}
        <Card id="confidence"> {/* Added ID for linking */}
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Activity className="text-primary" /> Confidence Assessment</CardTitle>
                 <CardDescription>Assess and improve your career readiness through mock interviews and challenges.</CardDescription>
            </CardHeader>
            <CardContent>
                <ConfidenceAssessment />
            </CardContent>
        </Card>

      </ProfileCheckWrapper>
    </div>
  );
}
