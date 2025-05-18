import { PageHeader } from '@/components/common/page-header';
import { ProfileForm } from './profile-form';
import { UdaanWalletDisplay } from './udaan-wallet-display';
import { ConfidenceScoreDisplay } from './confidence-score-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <PageHeader
        title="My Profile"
        description="Keep your profile updated for personalized recommendations."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Profile Form - takes more space */}
        <div className="lg:col-span-2">
            <ProfileForm />
        </div>

         {/* Side column for Wallet and Score */}
        <div className="space-y-6">
           <UdaanWalletDisplay />
           <ConfidenceScoreDisplay />
            {/* Placeholder for Skill Index */}
             {/* <Card>
                <CardHeader>
                    <CardTitle>Skill Index</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Skill Index calculation coming soon...</p>
                </CardContent>
             </Card> */}
        </div>
      </div>
    </div>
  );
}
