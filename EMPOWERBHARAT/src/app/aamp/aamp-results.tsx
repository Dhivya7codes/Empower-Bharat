"use client";

import type { HyperLocalCareerAdviceOutput } from '@/ai/flows/ai-mentor-panel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MapPin, Lightbulb } from 'lucide-react';

interface AampResultsProps {
  data: HyperLocalCareerAdviceOutput;
}

export function AampResults({ data }: AampResultsProps) {
  return (
    <div className="space-y-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="text-primary" />
            Hyper-Local Opportunities
          </CardTitle>
          <CardDescription>Opportunities identified near your location.</CardDescription>
        </CardHeader>
        <CardContent>
          {data.opportunities && data.opportunities.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2 text-sm">
              {data.opportunities.map((opportunity, index) => (
                <li key={index}>{opportunity}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No specific hyper-local opportunities found based on your current profile and location.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="text-primary" />
            Personalized Advice
          </CardTitle>
           <CardDescription>Guidance tailored to you, in your likely native language context.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line text-sm">{data.advice}</p>
        </CardContent>
      </Card>
    </div>
  );
}
