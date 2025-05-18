"use client";

import { useState, useEffect } from 'react';
import { getHyperLocalCareerAdvice, type HyperLocalCareerAdviceOutput } from '@/ai/flows/ai-mentor-panel';
import { useProfile } from '@/contexts/profile-context';
import { PageHeader } from '@/components/common/page-header';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { ErrorMessage } from '@/components/common/error-message';
import { Button } from '@/components/ui/button';
import { AampResults } from './aamp-results';
import { ProfileCheckWrapper } from '@/components/common/profile-check-wrapper';

export default function AampPage() {
  const { profile, isProfileComplete } = useProfile();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<HyperLocalCareerAdviceOutput | null>(null);

  const fetchAampAdvice = async () => {
    if (!profile) {
      setError('Profile data is missing.');
      return;
    }

     // Prepare input for the AI flow
    const input = {
        ...profile,
        age: profile.age ?? 0, // Default age if not set
        location: profile.location ?? '',
        tenthMarks: profile.tenthMarks ?? 0,
        twelfthMarks: profile.twelfthMarks ?? 0,
        graduationStatus: profile.graduationStatus ?? '',
        skills: profile.skills || [],
        languages: profile.languages || [],
        projects: profile.projects || [],
        category: profile.category ?? 'General', // Default category
    };

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await getHyperLocalCareerAdvice(input);
      setResults(data);
    } catch (err) {
      console.error('Error fetching AAMP advice:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred while fetching advice.');
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch when the component mounts and profile is complete
  useEffect(() => {
    if (isProfileComplete) {
      fetchAampAdvice();
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProfileComplete]);

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <PageHeader
        title="AI Mentor Panel (AAMP)"
        description="Get hyper-local career advice and opportunities from your virtual mentor panel."
      >
        <Button onClick={fetchAampAdvice} disabled={loading || !isProfileComplete}>
          {loading ? <LoadingSpinner size={16} className="mr-2" /> : null}
          {loading ? 'Generating...' : 'Refresh Advice'}
        </Button>
      </PageHeader>

      <ProfileCheckWrapper featureName="AI Mentor Panel">
        {loading && (
           <div className="flex justify-center items-center mt-10">
            <LoadingSpinner size={32} />
           </div>
        )}
        {error && <ErrorMessage message={error} />}
        {results && !loading && <AampResults data={results} />}
         {!loading && !error && !results && isProfileComplete && (
            <p className="text-center text-muted-foreground mt-10">Click 'Refresh Advice' to connect with your AI Mentor Panel.</p>
         )}
      </ProfileCheckWrapper>
    </div>
  );
}
