
"use client";

import { useState, useEffect, useMemo } from 'react';
import { suggestSchemes, type SuggestSchemesOutput } from '@/ai/flows/government-scheme-suggestions';
import { useProfile } from '@/contexts/profile-context';
import { PageHeader } from '@/components/common/page-header';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { ErrorMessage } from '@/components/common/error-message';
import { Button } from '@/components/ui/button';
import { SchemesResults } from './schemes-results';
import { ProfileCheckWrapper } from '@/components/common/profile-check-wrapper';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MapPin } from 'lucide-react';


export default function SchemesPage() {
  const { profile, isProfileComplete } = useProfile();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SuggestSchemesOutput | null>(null);

  const fetchSchemes = async () => {
    if (!profile) {
      setError('Profile data is missing.');
      return;
    }

     // Prepare input, ensuring required fields and types match the AI schema
     const input = {
        ...profile,
        age: profile.age ?? 0, // Default age if not set, adjust as needed
        location: profile.location ?? '',
        tenthMarks: profile.tenthMarks ?? 0,
        twelfthMarks: profile.twelfthMarks ?? 0,
        graduationStatus: profile.graduationStatus ?? '',
        skills: profile.skills || [],
        languages: profile.languages || [],
        projects: profile.projects || [],
        category: profile.category ?? 'General', // Default category if not set
    };


    setLoading(true);
    setError(null);
    setResults(null);

    try {
      console.log("Fetching schemes with input:", input); // Log input
      const data = await suggestSchemes(input);
      console.log("Received schemes data:", data); // Log output
      // Basic Location Filtering/Prioritization Simulation (client-side placeholder)
        if (profile?.location && data) {
            const userLocation = profile.location.toLowerCase();
            const prioritize = (items: any[]) => {
                 if (!items) return [];
                return items.sort((a, b) => {
                    // Simple check if description or eligibility mentions the location
                    const aMatch = a.description?.toLowerCase().includes(userLocation) || a.eligibility?.toLowerCase().includes(userLocation) || a.name?.toLowerCase().includes(userLocation);
                    const bMatch = b.description?.toLowerCase().includes(userLocation) || b.eligibility?.toLowerCase().includes(userLocation) || b.name?.toLowerCase().includes(userLocation);
                    if (aMatch && !bMatch) return -1;
                    if (!aMatch && bMatch) return 1;
                    return 0;
                });
            }
            data.schemes = prioritize(data.schemes);
            data.scholarships = prioritize(data.scholarships);
            // Could add similar logic for courses if relevant
        }

      setResults(data);
    } catch (err) {
      console.error('Error fetching schemes:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred while fetching schemes.');
       setResults(null); // Clear results on error
    } finally {
      setLoading(false);
    }
  };

   // Automatically fetch when the component mounts and profile is complete
  useEffect(() => {
    if (isProfileComplete) {
      fetchSchemes();
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProfileComplete]); // Rerun only when profile completeness changes

   // Filter results further based on profile location (client-side example)
   // Note: Ideally, the AI provides location-aware results. This is a fallback/enhancement.
   const locationFilteredResults = useMemo(() => {
        if (!results || !profile?.location) {
            return results; // Return original if no location or no results
        }
        // This is a simple example; more sophisticated filtering might be needed.
        // It assumes the AI might return broader results.
        // const userLocationLower = profile.location.toLowerCase();
        // const filterByLocation = (item: any) =>
        //     item.description?.toLowerCase().includes(userLocationLower) ||
        //     item.eligibility?.toLowerCase().includes(userLocationLower) ||
        //     item.name?.toLowerCase().includes(userLocationLower) ||
        //     !item.eligibility; // Keep items without specific eligibility listed

        // return {
        //     schemes: results.schemes?.filter(filterByLocation) || [],
        //     scholarships: results.scholarships?.filter(filterByLocation) || [],
        //     courses: results.courses // Keep courses as they might be less location-specific
        // };
         return results; // Use the prioritized results directly for now
   }, [results, profile?.location]);


  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <PageHeader
        title="Government Schemes & Opportunities Radar"
        description="Discover schemes, scholarships, and courses relevant to your profile and location."
      >
         <Button onClick={fetchSchemes} disabled={loading || !isProfileComplete}>
          {loading ? <LoadingSpinner size={16} className="mr-2" /> : null}
          {loading ? 'Fetching...' : 'Refresh Suggestions'}
        </Button>
      </PageHeader>

        {/* Location Info */}
       {profile?.location && (
            <Alert variant="default" className="mb-6 bg-secondary border-primary/20">
                <MapPin className="h-4 w-4 text-primary" />
                <AlertTitle className="font-semibold">Location Aware</AlertTitle>
                <AlertDescription>
                    Suggestions are prioritized based on your location: **{profile.location}**.
                </AlertDescription>
            </Alert>
       )}

       <ProfileCheckWrapper featureName="Government Schemes">
        {loading && (
           <div className="flex justify-center items-center mt-10">
            <LoadingSpinner size={32} />
           </div>
        )}
        {error && <ErrorMessage message={error} />}
        {locationFilteredResults && !loading && <SchemesResults data={locationFilteredResults} />}
         {!loading && !error && !locationFilteredResults && isProfileComplete && (
            <p className="text-center text-muted-foreground mt-10">Click 'Refresh Suggestions' to find relevant opportunities.</p>
         )}
       </ProfileCheckWrapper>
    </div>
  );
}
