import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Building, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  description: string;
  type?: 'Full-time' | 'Part-time' | 'Internship' | 'Temporary';
  applyLink?: string; // Optional link for apply button
}

export function JobCard({ title, company, location, description, type = 'Full-time', applyLink = "#" }: JobCardProps) {
  const handleApplyClick = () => {
    // Ensure window is defined (runs only on client) and link exists
    if (typeof window !== 'undefined' && applyLink && applyLink !== '#') {
      window.open(applyLink, '_blank', 'noopener,noreferrer');
    } else if (typeof window !== 'undefined') {
      // Optional: Handle case where link is missing or just '#'
      console.warn('Apply link is missing or invalid for job:', title);
      // You could show a toast message here
    }
  };


  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col h-full"> {/* Added flex flex-col h-full */}
      <CardHeader className="pb-3"> {/* Reduced bottom padding */}
        <CardTitle className="text-lg">{title}</CardTitle> {/* Slightly larger title */}
        <CardDescription className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-x-2 gap-y-1 pt-1 text-xs"> {/* Adjusted text size and gap */}
           <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5 text-muted-foreground" /> {company}</span>
           <span className="hidden sm:inline text-muted-foreground">•</span> {/* Use dot separator */}
           <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-muted-foreground" /> {location}</span>
        </CardDescription>
         <Badge variant="secondary" className="w-fit mt-3">{type}</Badge> {/* Increased top margin */}
      </CardHeader>
      <CardContent className="flex-grow pb-4"> {/* Added flex-grow and adjusted padding */}
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="pt-0"> {/* Remove top padding */}
         {/* Use standard Button with onClick instead of asChild */}
         <Button
           size="sm"
           className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
           onClick={handleApplyClick}
           disabled={!applyLink || applyLink === '#'} // Disable if no link or just '#'
         >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}
