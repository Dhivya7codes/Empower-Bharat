
"use client";

import { useProfile } from '@/contexts/profile-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function UdaanWalletDisplay() {
  const { profile } = useProfile();
  const points = profile?.points ?? 0; // Default to 0 if profile or points are null/undefined

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="text-primary" />
          Udaan Wallet
        </CardTitle>
         <CardDescription>Earn points and redeem rewards.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
         <div className="flex items-center justify-center gap-2 text-3xl font-bold text-accent">
            <Coins className="w-8 h-8" />
             <span>{points}</span>
         </div>
         <p className="text-sm text-muted-foreground text-center">
            Earn points by completing learning modules, contributing to the community, and more.
         </p>
         <Button variant="outline" size="sm" className="w-full" disabled>
             Redeem Points (Coming Soon)
         </Button>
         {/* Optional: Link to a page explaining how to earn points */}
         {/* <Button variant="link" size="sm" asChild className="w-full">
             <Link href="/how-to-earn-points">Learn how to earn points</Link>
         </Button> */}
      </CardContent>
    </Card>
  );
}
