
"use client";

import { useState } from 'react';
import { useProfile } from '@/contexts/profile-context';
import { assessConfidence, type AssessConfidenceInput, type AssessConfidenceOutput } from '@/ai/flows/confidence-assessor';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { ErrorMessage } from '@/components/common/error-message';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Send, Lightbulb } from 'lucide-react';

type AssessmentResult = AssessConfidenceOutput['assessmentResult'];

export function ConfidenceAssessment() {
  const { profile, updateProfile } = useProfile(); // Use updateProfile to save score potentially
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assessmentType, setAssessmentType] = useState<AssessConfidenceInput['assessmentType']>('mockInterviewQuestions');
  const [targetRole, setTargetRole] = useState(''); // Optional target role for questions
  const [userResponse, setUserResponse] = useState('');
  const [assessmentData, setAssessmentData] = useState<AssessConfidenceOutput | null>(null);

  const handleStartAssessment = async (type: AssessConfidenceInput['assessmentType']) => {
    if (!profile) {
      setError("Profile data is missing.");
      return;
    }
    setLoading(true);
    setError(null);
    setAssessmentData(null); // Clear previous results
    setUserResponse(''); // Clear previous response
    setAssessmentType(type); // Set the type for the request

    const input: AssessConfidenceInput = {
      profile,
      assessmentType: type,
      targetRole: targetRole || undefined,
    };

    try {
      const data = await assessConfidence(input);
      setAssessmentData(data);
      // If analysis was done, update profile score (optional)
      if (type === 'communicationAnalysis' && typeof data.assessmentResult === 'object' && 'score' in data.assessmentResult) {
         updateProfile({ confidenceScore: data.assessmentResult.score });
      }

    } catch (err) {
      console.error(`Error during ${type} assessment:`, err);
      setError(err instanceof Error ? err.message : `Failed to start ${type} assessment.`);
    } finally {
      setLoading(false);
    }
  };

   const handleSubmitResponse = async () => {
     if (!profile || !assessmentData || assessmentType !== 'skillChallengePrompt') { // Only submit for challenges now
       setError("Cannot submit response now.");
       return;
     }
     setLoading(true);
     setError(null);

      const input: AssessConfidenceInput = {
            profile,
            assessmentType: 'communicationAnalysis', // Now analyze the response
            userResponse: userResponse,
            targetRole: targetRole || undefined, // Carry over target role if set
        };

     try {
         const data = await assessConfidence(input);
         setAssessmentData(data); // Update state with analysis results
          // Update profile score
         if (typeof data.assessmentResult === 'object' && 'score' in data.assessmentResult) {
            updateProfile({ confidenceScore: data.assessmentResult.score });
         }

     } catch (err) {
       console.error("Error submitting response for analysis:", err);
       setError(err instanceof Error ? err.message : "Failed to analyze response.");
     } finally {
       setLoading(false);
     }
   };


  const renderAssessmentResult = (result: AssessmentResult | undefined) => {
    if (!result) return null;

    if (Array.isArray(result)) { // Questions or prompts
      return (
        <ul className="list-disc pl-5 space-y-2 text-sm">
          {result.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      );
    } else if (typeof result === 'object' && 'score' in result) { // Analysis result
      return (
        <div className="space-y-2 p-4 border rounded-md bg-secondary/50">
          <p className="font-semibold">Analysis Result:</p>
          <p className="text-sm"><span className="font-medium">Score:</span> {result.score}/100</p>
          <p className="text-sm"><span className="font-medium">Feedback:</span> {result.feedback}</p>
        </div>
      );
    }
    return <p className="text-muted-foreground">No results to display.</p>;
  };

  return (
    <div className="space-y-6">
       <div className="flex flex-wrap gap-2">
           <Button
                variant={assessmentType === 'mockInterviewQuestions' ? 'default' : 'outline'}
                size="sm" onClick={() => handleStartAssessment('mockInterviewQuestions')} disabled={loading}>
                {loading && assessmentType === 'mockInterviewQuestions' ? <LoadingSpinner size={16} className="mr-2"/> : null}
                Mock Interview Qs
            </Button>
            <Button
                 variant={assessmentType === 'skillChallengePrompt' ? 'default' : 'outline'}
                 size="sm" onClick={() => handleStartAssessment('skillChallengePrompt')} disabled={loading}>
                 {loading && assessmentType === 'skillChallengePrompt' ? <LoadingSpinner size={16} className="mr-2"/> : null}
                Skill Challenge
            </Button>
             {/* Communication analysis is triggered by submitting response now */}
            {/* <Button
                 variant={assessmentType === 'communicationAnalysis' ? 'default' : 'outline'}
                 size="sm" onClick={() => handleStartAssessment('communicationAnalysis')} disabled={loading || !userResponse}>
                 {loading && assessmentType === 'communicationAnalysis' ? <LoadingSpinner size={16} className="mr-2"/> : null}
                Analyze My Response
            </Button> */}
       </div>

      {error && <ErrorMessage message={error} />}

      {loading && !assessmentData && (
         <div className="flex justify-center items-center py-6">
            <LoadingSpinner />
         </div>
      )}

      {assessmentData && (
        <div className="mt-4 space-y-4">
          <div>{renderAssessmentResult(assessmentData.assessmentResult)}</div>

          {assessmentData.followUpPrompt && (
              <p className="text-sm text-muted-foreground italic flex items-center gap-1">
                 <Lightbulb className="w-4 h-4 text-primary" /> {assessmentData.followUpPrompt}
              </p>
          )}

         {/* Show Textarea only for skill challenge prompts */}
          {assessmentType === 'skillChallengePrompt' && Array.isArray(assessmentData.assessmentResult) && (
            <div className="space-y-2">
                <Textarea
                    placeholder="Type your response to the challenge here..."
                    value={userResponse}
                    onChange={(e) => setUserResponse(e.target.value)}
                    rows={5}
                    disabled={loading}
                />
                 <Button onClick={handleSubmitResponse} disabled={loading || !userResponse}>
                     {loading ? <LoadingSpinner size={16} className="mr-2"/> : <Send className="mr-2 h-4 w-4" />}
                    Submit Response for Analysis
                </Button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
