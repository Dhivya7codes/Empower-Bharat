"use client";

import type { PersonalizedLearningPlanOutput } from '@/ai/flows/career-coach';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, ListChecks, BrainCircuit, Briefcase } from 'lucide-react';

interface CareerCoachResultsProps {
  data: PersonalizedLearningPlanOutput;
}

export function CareerCoachResults({ data }: CareerCoachResultsProps) {
  return (
    <div className="space-y-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="text-primary" />
            Your Daily Learning Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{data.dailyPlan}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="text-primary" />
             Skill Assessment Quiz
          </CardTitle>
          <CardDescription>Test your knowledge based on your plan.</CardDescription>
        </CardHeader>
        <CardContent>
           <p className="whitespace-pre-line">{data.quiz}</p>
           {/* Future: Could integrate interactive quiz component here */}
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="text-primary" />
            Career Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
           {data.careerSuggestions && data.careerSuggestions.length > 0 ? (
             <ul className="list-disc pl-5 space-y-1">
              {data.careerSuggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
           ) : (
             <p className="text-muted-foreground">No specific career suggestions generated based on your current profile.</p>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
