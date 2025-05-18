
"use client";

import { useProfile } from '@/contexts/profile-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ConfidenceScoreDisplay() {
  const { profile } = useProfile();
  const score = profile?.confidenceScore ?? 0; // Default to 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="text-primary" />
          Confidence Score
        </CardTitle>
         <CardDescription>Your career readiness assessment.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
         <div className="text-center">
            <p className="text-4xl font-bold text-accent">{score}%</p>
            <Progress value={score} className="mt-2 h-2" />
         </div>

         <p className="text-sm text-muted-foreground text-center">
            Based on mock interviews, skill challenges, and communication assessments.
         </p>
         <Button variant="outline" size="sm" className="w-full" asChild>
             <Link href="/career-coach#confidence">Improve Score</Link>
             {/* Link to Career Coach or a dedicated assessment page */}
         </Button>
         {/* Optional: Growth Tracker */}
         {/* <div className="flex items-center justify-center gap-1 text-xs text-green-600">
            <TrendingUp className="w-3 h-3" />
            <span>+5% this week</span>
         </div> */}
      </CardContent>
    </Card>
  );
}
