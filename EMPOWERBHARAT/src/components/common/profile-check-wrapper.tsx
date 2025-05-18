"use client";

import Link from 'next/link';
import type React from 'react';
import { useProfile } from '@/contexts/profile-context';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileCheckWrapperProps {
  children: React.ReactNode;
  featureName: string;
}

export function ProfileCheckWrapper({ children, featureName }: ProfileCheckWrapperProps) {
  const { isProfileComplete } = useProfile();

  if (!isProfileComplete) {
    return (
      <Alert className="bg-secondary border-primary/30">
        <Info className="h-4 w-4 text-primary" />
        <AlertTitle className="font-semibold text-primary">Complete Your Profile</AlertTitle>
        <AlertDescription className="text-secondary-foreground">
          Please complete your profile to get personalized {featureName} suggestions.
          <Button asChild variant="link" className="p-0 h-auto ml-1 text-accent">
             <Link href="/profile">Go to Profile</Link>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
}
