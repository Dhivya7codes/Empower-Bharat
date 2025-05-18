
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DollarSign, Search, Briefcase, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Placeholder data for micro-gigs
const microGigs = [
  { id: 1, title: 'Translate English Document to Hindi', provider: 'Local NGO', pay: '₹200', duration: '~2 hours', skills: ['Hindi', 'English'] },
  { id: 2, title: 'Type Handwritten Notes into Word Doc', provider: 'Student Startup', pay: '₹150', duration: '~3 hours', skills: ['Typing'] },
  { id: 3, title: 'Simple Data Entry from PDF', provider: 'Small Business', pay: '₹300', duration: '~4 hours', skills: ['Data Entry', 'MS Excel'] },
  { id: 4, title: 'Collect Local Shop Information', provider: 'Market Research Co.', pay: '₹500 + Travel', duration: '1 Day', skills: ['Communication', 'Local Knowledge'] },
  { id: 5, title: 'Basic Social Media Poster Design', provider: 'Community Group', pay: '₹250', duration: '~2 hours', skills: ['Canva', 'Design Basics'] },
];

export default function LearnEarnPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <PageHeader
        title="Learn & Earn"
        description="Find micro-gigs and small projects to earn while learning."
      />

       {/* Search/Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <Input placeholder="Search gigs by skill, type, or provider..." className="flex-1" />
          <Button variant="outline" disabled>
              <Search className="mr-2 h-4 w-4" /> Search Gigs (Coming Soon)
          </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {microGigs.map((gig) => (
          <Card key={gig.id} className="flex flex-col justify-between shadow-sm">
            <CardHeader>
               <CardTitle className="text-lg">{gig.title}</CardTitle>
              <CardDescription>Provided by: {gig.provider}</CardDescription>
               <div className="flex flex-wrap gap-2 pt-2">
                   {gig.skills.map(skill => (
                       <Badge key={skill} variant="secondary">{skill}</Badge>
                   ))}
               </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                   <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                   <span>Pay: {gig.pay}</span>
                </div>
                 <div className="flex items-center text-sm text-muted-foreground">
                   <Clock className="w-4 h-4 mr-1" />
                   <span>Est. Duration: {gig.duration}</span>
                </div>
            </CardContent>
            <CardFooter>
              <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled>
                 Apply / View Details (Coming Soon)
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
        <p className="text-center text-muted-foreground mt-8">
          Gig posting, application, and payment integration features are under development.
       </p>
    </div>
  );
}
