
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Repeat, Search, PlusCircle } from 'lucide-react';

// Placeholder data
const exchangeOffers = [
  { id: 1, user: 'Anya S.', wants: 'English Speaking Practice', offers: 'Basic Python Tutoring', location: 'Pune' },
  { id: 2, user: 'Rohan K.', wants: 'UPSC History Notes', offers: 'Graphic Design (Posters)', location: 'Delhi' },
  { id: 3, user: 'Priya M.', wants: 'Java Debugging Help', offers: 'Hindi Typing', location: 'Jaipur' },
  { id: 4, user: 'Vikram B.', wants: 'Help with Govt. Form Filling', offers: 'Basic Smartphone Troubleshooting', location: 'Rural Haryana' },
];

export default function SkillExchangePage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <PageHeader
        title="SkillXchange"
        description="Connect with peers to learn and teach skills collaboratively."
      >
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled>
           <PlusCircle className="mr-2 h-4 w-4" /> Post Your Offer (Coming Soon)
        </Button>
      </PageHeader>

       {/* Search/Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <Input placeholder="Search skills you want to learn or offer..." className="flex-1" />
          <Button variant="outline" disabled>
              <Search className="mr-2 h-4 w-4" /> Search Exchanges (Coming Soon)
          </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exchangeOffers.map((offer) => (
          <Card key={offer.id} className="shadow-sm">
            <CardHeader>
               <CardTitle className="text-lg">{offer.user} <span className="text-sm font-normal text-muted-foreground">({offer.location})</span></CardTitle>
              {/* <CardDescription>Location: {offer.location}</CardDescription> */}
            </CardHeader>
            <CardContent className="space-y-3">
               <div>
                   <h4 className="font-semibold text-sm text-primary mb-1">Wants to Learn:</h4>
                   <p className="text-sm">{offer.wants}</p>
               </div>
                <div>
                   <h4 className="font-semibold text-sm text-accent mb-1">Can Teach/Offer:</h4>
                   <p className="text-sm">{offer.offers}</p>
               </div>
              <Button variant="outline" size="sm" className="w-full" disabled>
                 Connect (Coming Soon)
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
       <p className="text-center text-muted-foreground mt-8">
          Peer matching and connection features are under development.
       </p>
    </div>
  );
}
